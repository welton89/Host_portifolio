import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../../hooks/useBlog';
import styles from './BlogPost.module.css';
import Header from '../../components/Header/Header';
import HeaderMobile from '../../components/Header/HeaderMobile';
import Footer from '../../components/Footer/Footer';
import Background from '../../components/Background/Background';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { formatDate } from '../../utils/dateUtils';
import ShareButton from '../../components/ShareButton/ShareButton';
const BlogPost = () => {
    const { id } = useParams();
    const { posts, loading } = useBlog();
    const [isTocOpen, setIsTocOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100); // Porcentagem

    const post = posts.find(p => p.id === id);

    const changeFontSize = (delta) => {
        setFontSize(prev => {
            const next = prev + delta;
            if (next >= 100 && next <= 150) return next;
            return prev;
        });
    };
    // Extrai títulos para o sumário
    const toc = useMemo(() => {
        if (!post?.content) return [];
        const headingRegex = /^(#{1,3})\s+(.+)$/gm;
        const matches = [];
        let match;
        while ((match = headingRegex.exec(post.content)) !== null) {
            const level = match[1].length;
            const text = match[2];
            const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            matches.push({ level, text, slug });
        }
        return matches;
    }, [post?.content]);
    // Pré-processa o conteúdo para evitar que tabs/4 espaços no início da linha virem blocos de código
    const processedContent = useMemo(() => {
        if (!post?.content) return '';
        return post.content
            .replace(/^(\t+)/gm, (match) => '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(match.length))
            .replace(/^( {4,})/gm, (match) => '&nbsp;'.repeat(match.length));
    }, [post?.content]);

    // Componentes customizados para o ReactMarkdown injetar IDs
    const MarkdownComponents = {
        h1: ({ children }) => {
            const slug = children.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return <h1 id={slug}>{children}</h1>;
        },
        h2: ({ children }) => {
            const slug = children.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return <h2 id={slug}>{children}</h2>;
        },
        h3: ({ children }) => {
            const slug = children.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return <h3 id={slug}>{children}</h3>;
        }
    };

    const scrollToSection = (slug) => {
        const element = document.getElementById(slug);
        if (element) {
            const offset = 100; // Espaço para o header fixo
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsTocOpen(false);
        }
    };

    if (loading) {
        return (
            <div className="main">
                <Header />
                <HeaderMobile />
                <Background />
                <div className="content">
                    <div className={styles.loading}>Carregando artigo...</div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="main">
                <Header />
                <HeaderMobile />
                <Background />
                <div className="content">
                    <div className={styles.notFound}>
                        <h1>Post não encontrado</h1>
                        <Link to="/blog" className={styles.backLink}>Voltar para o Blog</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main">
            <Header />
            <HeaderMobile />
            <Background />

            <div className="content">
                <article className={styles.postContainer}>
                    <Link to="/blog" className={styles.backLink}>
                        <i className="fas fa-arrow-left"></i> Voltar para o Blog
                    </Link>

                    <header className={styles.header}>
                        <div className={styles.headerTop}>
                            <span className={styles.date}>{formatDate(post.date)}</span>
                            <div className={styles.headerActions}>
                                <div className={styles.accessibilityControls}>
                                    <button
                                        onClick={() => changeFontSize(-10)}
                                        disabled={fontSize <= 100}
                                        title="Diminuir fonte"
                                    >
                                        A-
                                    </button>
                                    <button
                                        onClick={() => setFontSize(100)}
                                        className={fontSize === 100 ? styles.activeSize : ''}
                                        title="Tamanho normal"
                                    >
                                        A
                                    </button>
                                    <button
                                        onClick={() => changeFontSize(10)}
                                        disabled={fontSize >= 150}
                                        title="Aumentar fonte"
                                    >
                                        A+
                                    </button>
                                </div>
                                <ShareButton title={post.title} url={window.location.href} />
                            </div>
                        </div>
                        <h1>{post.title}</h1>
                        {post.tags && (
                            <div className={styles.tags}>
                                {post.tags.split(',').map((tag, i) => (
                                    <span key={i} className={styles.tag}>{tag.trim()}</span>
                                ))}
                            </div>
                        )}
                        <p className={styles.summary}>{post.summary}</p>
                    </header>

                    {post.image && (
                        <div className={styles.imageWrapper}>
                            <img src={post.image} alt={post.title} />
                        </div>
                    )}

                    <div className={styles.contentBody} style={{ fontSize: `${fontSize}%` }}>
                        <ReactMarkdown
                            components={MarkdownComponents}
                            rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                        >
                            {processedContent}
                        </ReactMarkdown>
                    </div>
                </article>

                {/* Sumário Flutuante */}
                {toc.length > 0 && (
                    <>
                        <button
                            className={`${styles.tocToggle} ${isTocOpen ? styles.active : ''}`}
                            onClick={() => setIsTocOpen(!isTocOpen)}
                            title="Sumário"
                        >
                            <i className={isTocOpen ? "fas fa-times" : "fas fa-list-ul"}></i>
                        </button>

                        <div className={`${styles.tocMenu} ${isTocOpen ? styles.open : ''}`}>
                            <div className={styles.tocHeader}>
                                <h3>Sumário</h3>
                                <div className={styles.accessibilityControls}>
                                    <button
                                        onClick={() => changeFontSize(-10)}
                                        disabled={fontSize <= 100}
                                        title="Diminuir fonte"
                                    >
                                        A-
                                    </button>
                                    <button
                                        onClick={() => setFontSize(100)}
                                        className={fontSize === 100 ? styles.activeSize : ''}
                                        title="Tamanho normal"
                                    >
                                        A
                                    </button>
                                    <button
                                        onClick={() => changeFontSize(10)}
                                        disabled={fontSize >= 150}
                                        title="Aumentar fonte"
                                    >
                                        A+
                                    </button>
                                </div>
                            </div>
                            <ul>
                                {toc.map((item, index) => (
                                    <li
                                        key={index}
                                        className={styles[`level${item.level}`]}
                                        onClick={() => scrollToSection(item.slug)}
                                    >
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {isTocOpen && <div className={styles.overlay} onClick={() => setIsTocOpen(false)} />}
                    </>
                )}

                <Footer />
            </div>
        </div>
    );
};

export default BlogPost;
