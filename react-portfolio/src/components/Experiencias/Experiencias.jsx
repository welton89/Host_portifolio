import styles from './Experiencias.module.css'
import { useConfig } from '../../hooks/useConfig'

function Experiencias() {
    const { experience } = useConfig();

    const defaultExperience = (
        <>
            <p>
                Ao longo da minha trajetória acadêmica e profissional,
                desenvolvi um conjunto de habilidades abrangentes,
                com ênfase em desenvolvimento de software e gestão de dados.
                Minha formação inclui proficiência em arquitetura de software,
                boas práticas de programação, design de interface e
                experiência do usuário (UI/UX), e otimização de projetos.
            </p>
            <p>
                Durante minha atuação na Procuradoria-Seccional da Fazenda Nacional em Juazeiro do Norte,
                adquiri experiência significativa em estruturação,
                extração e tratamento de dados provenientes de diversas fontes,
                incluindo APIs, planilhas Google, bancos de dados SQL,
                BigQuery e arquivos CSV. Essa experiência permitiu-me
                desenvolver soluções completas e eficientes para análise e manipulação de dados.

                Adicionalmente, desenvolvi expertise em automação de processos
                utilizando o Google Workspace e AppScript, criando documentos
                personalizados e implementando sistemas de envio automático de e-mails,
                otimizando fluxos de trabalho e aumentando a produtividade.
            </p>
            <p>
                Em meus projetos pessoais e atividades de aprendizado contínuo,
                explorei uma ampla gama de tecnologias, incluindo Python,
                Flutter, HTML, CSS, JavaScript, Django, bancos de dados SQL,
                Websocket, sistemas Linux, Streamlit, plataformas LowCode, Docker, Flet, e muitas outras.
            </p>
        </>
    );

    return (
        <>
            <div id="experiencias"></div>
            <section className={`${styles.section} animate__animated animate__fadeInUp`}>
                <h2>Experiências</h2>
                {experience ? (
                    <p style={{ whiteSpace: 'pre-wrap' }}>{experience}</p>
                ) : defaultExperience}

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <h3>20+</h3>
                        <p>Projeto</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>05+</h3>
                        <p>Áreas de Atuação</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>04+</h3>
                        <p>Anos de experiência</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>50 mil+</h3>
                        <p>Linhas de códigos</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Experiencias
