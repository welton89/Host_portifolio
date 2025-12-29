import { useState } from 'react';
import { useBlog } from '../../hooks/useBlog';
import { compressImage } from '../../utils/imageUtils';
import { formatDate, parseToISODate, parseToTimestamp } from '../../utils/dateUtils';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import styles from './BlogManager.module.css';

const BlogManager = () => {
    const { posts, loading, addPost, updatePost, deletePost } = useBlog();
    const [isEditing, setIsEditing] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        image: '',
        tags: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const base64 = await compressImage(file);
            setFormData(prev => ({ ...prev, image: base64 }));
        } catch (error) {
            console.error('Erro ao processar imagem:', error);
            alert('Erro ao processar imagem. Tente outro arquivo.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            updatePost(isEditing, formData);
            setIsEditing(null);
        } else {
            // Se não houver data, usa a data atual no formato ISO para o input type="date"
            const defaultDate = new Date().toISOString().split('T')[0];
            const finalDate = formData.date || defaultDate;
            addPost({ ...formData, date: finalDate });
        }
        setFormData({
            title: '',
            summary: '',
            content: '',
            image: '',
            tags: '',
            date: ''
        });
    };

    const handleEdit = (post) => {
        setIsEditing(post.id);
        setFormData({
            title: post.title,
            summary: post.summary,
            content: post.content,
            image: post.image,
            tags: post.tags || '',
            date: parseToISODate(post.date)
        });
    };

    const handleCancel = () => {
        setIsEditing(null);
        setFormData({
            title: '',
            summary: '',
            content: '',
            image: '',
            tags: '',
            date: ''
        });
    };

    const handleDeleteClick = (id) => {
        setPostToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (postToDelete) {
            deletePost(postToDelete);
            setShowDeleteModal(false);
            setPostToDelete(null);
        }
    };

    return (
        <section className={styles.managerSection}>
         

            <form onSubmit={handleSubmit} className={styles.blogForm}>
                <h3>{isEditing ? 'Editar Post' : 'Novo Post'}</h3>
                <div className={styles.formGrid}>
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <label htmlFor="summary">Resumo (breve descrição)</label>
                        <input
                            type="text"
                            id="summary"
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="image">Imagem de Capa</label>
                        <div className={styles.uploadWrapper}>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="URL ou Base64"
                            />
                            <label className={styles.uploadButton}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <i className={isUploading ? "fas fa-spinner fa-spin" : "fas fa-upload"}></i>
                            </label>
                        </div>
                        {formData.image && (
                            <div className={styles.imagePreview}>
                                <img src={formData.image} alt="Preview" />
                            </div>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="tags">Tags (separadas por vírgula)</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="React, GunJS, CSS"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="date">Data</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <label htmlFor="content">Conteúdo (Suporta Markdown)</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="10"
                            required
                        />
                    </div>
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitButton}>
                        {isEditing ? 'Atualizar Post' : 'Publicar Post'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className={styles.postList}>
                <h3>Posts Publicados</h3>
                {loading ? (
                    <p>Carregando posts...</p>
                ) : posts.length === 0 ? (
                    <p>Nenhum post encontrado.</p>
                ) : (
                    <div className={styles.listGrid}>
                        {posts.map(post => (
                            <div key={post.id} className={styles.postCard}>
                                <div className={styles.cardInfo}>
                                    <h4>{post.title}</h4>
                                    <p>{formatDate(post.date)}</p>
                                </div>
                                <div className={styles.cardActions}>
                                    <button onClick={() => handleEdit(post)} className={styles.editButton}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => handleDeleteClick(post.id)} className={styles.deleteButton}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Excluir Postagem"
                message="Tem certeza que deseja excluir esta postagem? Esta ação removerá o conteúdo permanentemente do seu blog."
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </section>
    );
};

export default BlogManager;
