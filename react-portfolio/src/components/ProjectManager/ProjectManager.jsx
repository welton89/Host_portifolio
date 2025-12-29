import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { compressImage } from '../../utils/imageUtils';
import { parseToISODate, parseToTimestamp } from '../../utils/dateUtils';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import styles from './ProjectManager.module.css';

const ProjectManager = () => {
    const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
    const [isEditing, setIsEditing] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        descricao: '',
        imagem: '',
        linkRepositorio: '',
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
            setFormData(prev => ({ ...prev, imagem: base64 }));
        } catch (error) {
            console.error('Erro ao processar imagem:', error);
            alert('Erro ao processar imagem. Tente outro arquivo.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Se não houver data, o timestamp será 0 para manter a ordem alfabética
        const timestamp = formData.date ? parseToTimestamp(formData.date) : 0;
        const dataToSave = { ...formData, timestamp };

        if (isEditing) {
            updateProject(isEditing, dataToSave);
            setIsEditing(null);
        } else {
            addProject(dataToSave);
        }
        setFormData({
            title: '',
            subtitle: '',
            descricao: '',
            imagem: '',
            linkRepositorio: '',
            date: ''
        });
    };

    const handleEdit = (project) => {
        setIsEditing(project.id);
        setFormData({
            title: project.title,
            subtitle: project.subtitle,
            descricao: project.descricao,
            imagem: project.imagem,
            linkRepositorio: project.linkRepositorio,
            date: parseToISODate(project.date)
        });
    };

    const handleCancel = () => {
        setIsEditing(null);
        setFormData({
            title: '',
            subtitle: '',
            descricao: '',
            imagem: '',
            linkRepositorio: '',
            date: ''
        });
    };

    const handleDeleteClick = (id) => {
        setProjectToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            deleteProject(projectToDelete);
            setShowDeleteModal(false);
            setProjectToDelete(null);
        }
    };

    return (
        <section className={styles.managerSection}>

            <form onSubmit={handleSubmit} className={styles.projectForm}>
                <h3>{isEditing ? 'Editar Projeto' : 'Novo Projeto'}</h3>
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
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
                    <div className={styles.inputGroup}>
                        <label htmlFor="subtitle">Subtítulo</label>
                        <input
                            type="text"
                            id="subtitle"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="imagem">Imagem do Projeto</label>
                        <div className={styles.uploadWrapper}>
                            <input
                                type="text"
                                id="imagem"
                                name="imagem"
                                value={formData.imagem}
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
                        {formData.imagem && (
                            <div className={styles.imagePreview}>
                                <img src={formData.imagem} alt="Preview" />
                            </div>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="linkRepositorio">Link do Repositório</label>
                        <input
                            type="text"
                            id="linkRepositorio"
                            name="linkRepositorio"
                            value={formData.linkRepositorio}
                            onChange={handleChange}
                            placeholder="https://github.com/usuario/projeto"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="date">Data (para ordenação)</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitButton}>
                        {isEditing ? 'Atualizar Projeto' : 'Adicionar Projeto'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className={styles.projectList}>
                <h3>Projetos Cadastrados</h3>
                {loading ? (
                    <p>Carregando projetos...</p>
                ) : projects.length === 0 ? (
                    <p>Nenhum projeto encontrado.</p>
                ) : (
                    <div className={styles.listGrid}>
                        {projects.map(project => (
                            <div key={project.id} className={styles.projectCard}>
                                <div className={styles.cardInfo}>
                                    <h4>{project.title}</h4>
                                    <p>{project.subtitle}</p>
                                </div>
                                <div className={styles.cardActions}>
                                    <button onClick={() => handleEdit(project)} className={styles.editButton}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => handleDeleteClick(project.id)} className={styles.deleteButton}>
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
                title="Excluir Projeto"
                message="Tem certeza que deseja excluir este projeto? Esta ação removerá o projeto permanentemente do seu portfólio."
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </section>
    );
};

export default ProjectManager;
