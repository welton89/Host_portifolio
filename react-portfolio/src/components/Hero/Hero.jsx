import styles from './Hero.module.css'
import perfilImg from '../../assets/img/perfil.png'
import { useConfig } from '../../hooks/useConfig'

function Hero() {
    const { intro1, intro2 } = useConfig();

    const defaultIntro1 = `um desenvolvedor full stack apaixonado por transformar
                        ideias em soluções digitais. Com mais de 3 anos de experiência,
                        encontrando soluções para problemas complexos através das principais
                        tecnologias disponiveis no mercado,
                        criando aplicações e automações eficientes e confiáveis.`;

    const defaultIntro2 = `Estou sempre atualizado com as últimas tendências e ferramentas do mercado.
                            Minha busca por conhecimento é constante, assim como minha sede por desafios.
                            O aprendizado rápido é uma de minhas maiores habilidades,
                            permitindo-me adaptar a novas linguagens e frameworks com agilidade e eficiência.`;

    return (
        <section id="section-1" className={styles.section}>
            <div className={styles.apresentation}>
                <div id="intro-1" className={`${styles.intro} ${styles.intro1} animate__animated animate__fadeInLeft`}>
                    <h1>Olá! Sou <span>Welton Moura,</span></h1>
                    <p>
                        {intro1 || defaultIntro1}
                    </p>
                </div>

                <div id="intro-2" className={`${styles.intro} ${styles.intro2}`}>
                    <div className={`${styles.circle} animate__animated animate__zoomIn`}>
                        <div className={`${styles.image} animate__animated`}>
                            <img
                                style={{ filter: 'drop-shadow(-5px -5px 4.5px rgba(8, 8, 8, 0.616))' }}
                                alt="photo Welton Moura"
                                src={perfilImg}
                            />
                        </div>
                    </div>
                </div>

                <div id="intro-3" className={`${styles.intro} ${styles.intro3} animate__animated animate__fadeInUp`}>
                    <div>
                        <h2>Em constante evolução</h2>
                        <p>
                            {intro2 || defaultIntro2}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
