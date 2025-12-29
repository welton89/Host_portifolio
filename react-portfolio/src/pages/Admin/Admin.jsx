import { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import gun, { MASTER_PUB_KEY, user } from '../../lib/gun';
import { compressImage } from '../../utils/imageUtils';
import ProjectManager from '../../components/ProjectManager/ProjectManager';
import BlogManager from '../../components/BlogManager/BlogManager';

const Admin = () => {
    const navigate = useNavigate();
    const { username, pub, logout } = useAuth();

    // Estados para as configurações
    const [config, setConfig] = useState({
        publicKeys: '',
        intro1: '',
        intro2: '',
        experience: '',
        blogCover: ''
    });
    const [saveStatus, setSaveStatus] = useState('');
    const [isUploadingCover, setIsUploadingCover] = useState(false);

    const handleLogout = () => {
        logout(() => navigate('/login'));
    };

    // Carregar configurações do Gun.js (do proprietário)
    useEffect(() => {
        const configRef = gun.user(MASTER_PUB_KEY).get('portifolio').get('config');

        configRef.once((data) => {
            if (data) {
                setConfig({
                    publicKeys: data.publicKeys || '',
                    intro1: data.intro1 || '',
                    intro2: data.intro2 || '',
                    experience: data.experience || '',
                    blogCover: data.blogCover || ''
                });
            }
        });
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        setSaveStatus('Salvando...');

        // Salvamos no grafo do usuário logado
        user.get('portifolio').get('config').put({
            publicKeys: config.publicKeys,
            intro1: config.intro1,
            intro2: config.intro2,
            experience: config.experience,
            blogCover: config.blogCover
        }, (ack) => {
            if (ack.err) {
                setSaveStatus('Erro ao salvar: ' + ack.err);
            } else {
                setSaveStatus('Configurações salvas com sucesso!');
                setTimeout(() => setSaveStatus(''), 3000);
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleBlogCoverChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsUploadingCover(true);
            const base64 = await compressImage(file, 1920, 1080, 0.6); // Capa maior, mas comprimida
            setConfig(prev => ({ ...prev, blogCover: base64 }));
        } catch (error) {
            console.error('Erro ao processar imagem de capa:', error);
            alert('Erro ao processar imagem. Tente outro arquivo.');
        } finally {
            setIsUploadingCover(false);
        }
    };

    const [activeSection, setActiveSection] = useState('config'); // 'config', 'projects', 'blog'

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className={styles.adminContainer}>
            <header className={styles.header}>
                <div>
                    <h1>Painel de Administração</h1>
                    <p className={styles.welcome}>Bem-vindo, {username}</p>
                    <p className={styles.pubKey}>Sua chave: <code>{pub}</code></p>
                </div>
                <div className={styles.headerActions}>
                    <Link to="/" className={styles.backLink}>
                        <i className="fas fa-arrow-left"></i> Voltar
                    </Link>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        <i className="fas fa-sign-out-alt"></i> Sair
                    </button>
                </div>
            </header>

            <main className={styles.mainContent}>
                <section className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h3>Projetos</h3>
                        <p className={styles.statValue}>4</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Experiências</h3>
                        <p className={styles.statValue}>3</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Contatos</h3>
                        <p className={styles.statValue}>12</p>
                    </div>
                </section>

                {/* Seção de Configurações */}
                <section className={`${styles.accordionSection} ${activeSection === 'config' ? styles.active : ''}`}>
                    <div className={styles.accordionHeader} onClick={() => toggleSection('config')}>
                        <h2><i className="fas fa-cog"></i> Configurações do Portfólio</h2>
                        <i className={`fas fa-chevron-${activeSection === 'config' ? 'up' : 'down'}`}></i>
                    </div>

                    {activeSection === 'config' && (
                        <div className={styles.accordionContent}>
                            <form onSubmit={handleSave} className={styles.configForm}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="publicKeys">Chaves Públicas (Lista de Users Gun.js)</label>
                                    <input
                                        type="text"
                                        id="publicKeys"
                                        name="publicKeys"
                                        value={config.publicKeys}
                                        onChange={handleChange}
                                        placeholder="Ex: key1, key2, key3"
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="blogCover">Imagem de Capa do Blog</label>
                                    <div className={styles.uploadWrapper}>
                                        <input
                                            type="text"
                                            id="blogCover"
                                            name="blogCover"
                                            value={config.blogCover}
                                            onChange={handleChange}
                                            placeholder="URL ou Base64"
                                        />
                                        <label className={styles.uploadButton}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBlogCoverChange}
                                                style={{ display: 'none' }}
                                            />
                                            <i className={isUploadingCover ? "fas fa-spinner fa-spin" : "fas fa-upload"}></i>
                                        </label>
                                    </div>
                                    {config.blogCover && (
                                        <div className={styles.imagePreview}>
                                            <img src={config.blogCover} alt="Preview Capa Blog" />
                                        </div>
                                    )}
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="intro1">Texto de Apresentação 1</label>
                                    <textarea
                                        id="intro1"
                                        name="intro1"
                                        value={config.intro1}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Olá! Sou Welton Moura..."
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="intro2">Texto de Apresentação 2</label>
                                    <textarea
                                        id="intro2"
                                        name="intro2"
                                        value={config.intro2}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Em constante evolução..."
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="experience">Texto de Experiência</label>
                                    <textarea
                                        id="experience"
                                        name="experience"
                                        value={config.experience}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="Ao longo da minha trajetória..."
                                    />
                                </div>

                                <div className={styles.formFooter}>
                                    {saveStatus && <p className={styles.statusMessage}>{saveStatus}</p>}
                                    <button type="submit" className={styles.saveButton}>
                                        <i className="fas fa-save"></i> Salvar Configurações
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </section>

                {/* Seção de Projetos */}
                <section className={`${styles.accordionSection} ${activeSection === 'projects' ? styles.active : ''}`}>
                    <div className={styles.accordionHeader} onClick={() => toggleSection('projects')}>
                        <h2><i className="fas fa-briefcase"></i> Gerenciar Projetos</h2>
                        <i className={`fas fa-chevron-${activeSection === 'projects' ? 'up' : 'down'}`}></i>
                    </div>
                    {activeSection === 'projects' && (
                        <div className={styles.accordionContent}>
                            <ProjectManager />
                        </div>
                    )}
                </section>

                {/* Seção de Blog */}
                <section className={`${styles.accordionSection} ${activeSection === 'blog' ? styles.active : ''}`}>
                    <div className={styles.accordionHeader} onClick={() => toggleSection('blog')}>
                        <h2><i className="fas fa-newspaper"></i> Gerenciar Blog</h2>
                        <i className={`fas fa-chevron-${activeSection === 'blog' ? 'up' : 'down'}`}></i>
                    </div>
                    {activeSection === 'blog' && (
                        <div className={styles.accordionContent}>
                            <BlogManager />
                        </div>
                    )}
                </section>

                <section className={styles.actions}>
                    <h2>Gerenciamento Rápido</h2>
                    <div className={styles.buttonGroup}>
                        <button className={styles.actionButton}>Editar Experiências</button>
                        <button className={styles.actionButton}>Ver Mensagens</button>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>© 2025 Welton Moura - Admin Panel</p>
            </footer>
        </div>
    );
};

export default Admin;
