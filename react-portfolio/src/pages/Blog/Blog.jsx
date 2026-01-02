import { useState, useEffect } from 'react';
import { useBlog } from '../../hooks/useBlog';
import styles from './Blog.module.css';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import HeaderMobile from '../../components/Header/HeaderMobile';
import Footer from '../../components/Footer/Footer';
import Background from '../../components/Background/Background';
import gun, { MASTER_PUB_KEY } from '../../lib/gun';
import { formatDate } from '../../utils/dateUtils';
import ShareButton from '../../components/ShareButton/ShareButton';

const Blog = () => {
    const { posts, loading } = useBlog();
    const [blogCover, setBlogCover] = useState('');

    useEffect(() => {
        const configRef = gun.user(MASTER_PUB_KEY).get('portifolio').get('config');
        configRef.get('blogCover').once((data) => {
            if (data) setBlogCover(data);
        });
    }, []);

    return (
        <div className="main">
            <Header />
            <HeaderMobile />
            <Background />

            <div className="content">
                <div className={styles.postsContainer}>
                    <header
                        className={styles.blogHeader}
                        style={blogCover ? {
                            backgroundImage: `url(${blogCover})`,
                            marginLeft: -8,
                            marginRight: -8,
                            padding: 0,
                            borderRadius: 0
                        } : {}}
                    >
                        <div className={styles.headerOverlay}>
                            <h1>Dev Sem NexO</h1>
                            <p>Aqui nada faz sentido.</p>
                        </div>
                    </header>

                    {loading ? (
                        <div className={styles.loading}>Carregando artigos...</div>
                    ) : (
                        <div className={styles.postsGrid}>
                            {posts.length === 0 ? (
                                <p className={styles.noPosts}>Ainda não há publicações por aqui. Volte em breve!</p>
                            ) : (
                                posts.map(post => (
                                    <article key={post.id} className={styles.postCard}>
                                        {post.image && (
                                            <div className={styles.imageWrapper}>
                                                <img src={post.image} alt={post.title} />
                                            </div>
                                        )}
                                        <div className={styles.postContent}>
                                            <div className={styles.meta}>
                                                {post.tags && (
                                                    <div className={styles.tags}>
                                                        {post.tags.split(',').map((tag, i) => (
                                                            <span key={i} className={styles.tag}>{tag.trim()}</span>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className={styles.shareWrapper}>
                                                    <ShareButton
                                                        title={post.title}
                                                        url={`/blog/${post.id}`}
                                                    />
                                                </div>
                                            </div>
                                            <h2>{post.title}</h2>
                                            <p>{post.summary}</p>

                                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                              <span className={styles.date}>{formatDate(post.date)}</span>
                                            <Link to={`/blog/${post.id}`} className={styles.readMore}>
                                                Ler mais <i className="fas fa-arrow-right"></i>
                                            </Link>

                                            </div>
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Blog;
