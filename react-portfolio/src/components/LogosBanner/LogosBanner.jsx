import styles from './LogosBanner.module.css'
import logoDjango from '../../assets/img/logos/logo-danjo.png'
import logoFlutter from '../../assets/img/logos/logo-flutter.png'
import logoHtml from '../../assets/img/logos/logo-html.png'
import logoPost from '../../assets/img/logos/logo-post.png'

function LogosBanner() {
    return (
        <div id="base-logos" className={`${styles.logos} animate__animated animate__fadeInUp`}>
            <div className={styles.backLogo}>
                <img alt="Meta logotipo" src={logoDjango} />
            </div>
            <div className={styles.backLogo}>
                <img alt="Logotipo do Google" src={logoFlutter} />
            </div>
            <div className={styles.backLogo}>
                <img alt="Logotipo do LinkedIn" src={logoHtml} />
            </div>
            <div className={styles.backLogo}>
                <img alt="Logotipo do Slack" src={logoPost} />
            </div>
        </div>
    )
}

export default LogosBanner
