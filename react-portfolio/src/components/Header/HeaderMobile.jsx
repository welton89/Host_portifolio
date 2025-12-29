import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './HeaderMobile.module.css'

function HeaderMobile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navLinksRef = useRef(null)
    const navToggleRef = useRef(null)
    const location = useLocation();
    const isHome = location.pathname === '/';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleSmoothScroll = (e, targetId) => {
        if (!isHome) return;

        e.preventDefault()
        setIsMenuOpen(false)
        const element = document.querySelector(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMenuOpen &&
                navLinksRef.current &&
                navToggleRef.current &&
                !navLinksRef.current.contains(event.target) &&
                !navToggleRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isMenuOpen])

    return (
        <div className={`${styles.headerMobile} animate__animated animate__slideInDown`}>
            <div className={styles.logo}>
                <a href="/lab">
                    <i className="fas fa-user-circle"></i>
                </a>
                <span>Hello World</span>
            </div>
            <button
                className={styles.navToggle}
                onClick={toggleMenu}
                ref={navToggleRef}
            >
                <i className="fas fa-bars"></i>
            </button>
            <nav
                ref={navLinksRef}
                className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}
            >
                {isHome ? (
                    <>
                        <a href="#" onClick={(e) => handleSmoothScroll(e, '#section-1')}>Quem Sou</a>
                        <a href="#experiencias" onClick={(e) => handleSmoothScroll(e, '#experiencias')}>Experiências</a>
                        <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projetos</a>
                    </>
                ) : (
                    <>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Portfólio</Link>
                    </>
                )}
                <Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                <a href="#contacts" onClick={(e) => handleSmoothScroll(e, '#contacts')}>Contato</a>
                <Link to="/adm" onClick={() => setIsMenuOpen(false)}>ADM</Link>
            </nav>
        </div>
    )
}

export default HeaderMobile
