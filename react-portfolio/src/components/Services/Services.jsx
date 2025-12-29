import styles from './Services.module.css'

function Services() {
    return (
        <section className={styles.section}>
            <div className={styles.services}>
                <div className={styles.service}>
                    <div className={styles.icon}>
                        <i className="fas fa-paint-brush"></i>
                        <h3>Design de UI/UX</h3>
                    </div>
                    <p>Design bonito e indutivo para facilitar o uso do aplicativo pelos usuários.</p>
                </div>
                <div className={styles.service}>
                    <div className={styles.icon}>
                        <i className="fas fa-code"></i>
                        <h3>Programação Web</h3>
                    </div>
                    <p>Sites de qualidade otimizado para performance, mecanismos de busca, e acessibilidade.</p>
                </div>
                <div className={styles.service}>
                    <div className={styles.icon}>
                        <i className="fas fa-database"></i>
                        <h3>Ciência de dados</h3>
                    </div>
                    <p>Utilizar matemática e estatística para extrair insights a partir de grandes conjuntos de dados para uma boa tomada de decisão.</p>
                </div>
            </div>
        </section>
    )
}

export default Services
