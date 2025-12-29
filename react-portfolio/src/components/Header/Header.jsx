import styles from './Header.module.css'
import { Link, useLocation } from 'react-router-dom'

function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const handleSmoothScroll = (e, targetId) => {
        if (!isHome) return; // Se não estiver na home, deixa o link funcionar normalmente ou redirecionar

        e.preventDefault()
        const element = document.querySelector(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <header className={`${styles.header} animate__animated animate__slideInDown`}>
            <div className={styles.logo}>
                <a href="/lab">
                    <i className="fas fa-user-circle"></i>
                </a>
                <span>Hello World</span>
            </div>
            <nav>
                {isHome ? (
                    <>
                        <a href="#" onClick={(e) => handleSmoothScroll(e, '#section-1')}>Quem Sou</a>
                        <a href="#experiencias" onClick={(e) => handleSmoothScroll(e, '#experiencias')}>Experiências</a>
                        <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projetos</a>
                    </>
                ) : (
                    <>
                        <Link to="/">Portifólio</Link>
                    </>
                )}
                <Link to="/blog">Blog</Link>
                <a href="#contacts" onClick={(e) => handleSmoothScroll(e, '#contacts')}>Contato</a>
                <Link to="/adm">ADM</Link>
            </nav>
        </header>
    )
}

export default Header
