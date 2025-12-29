import styles from './Footer.module.css'

function Footer() {
    return (
        <footer id="contacts" className={styles.contact}>
            <div className={styles.social}>
                <h3 className={styles.contactTitle}>Contato</h3>
                <div className={styles.icons}>
                    <a target="_blank" rel="noopener noreferrer" href="https://br.linkedin.com/in/welton-moura-23a897230">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/welton89">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="mailto:weltonmoura@live.com">
                        <i className="fas fa-envelope"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://t.me/welton89">
                        <i className="fab fa-telegram"></i>
                    </a>
                </div>
                <h6 className={styles.copyright}>
                    © 2025 Welton Moura
                </h6>
            </div>
        </footer>
    )
}

export default Footer
