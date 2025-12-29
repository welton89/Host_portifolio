import Header from '../../components/Header/Header'
import HeaderMobile from '../../components/Header/HeaderMobile'
import Hero from '../../components/Hero/Hero'
import LogosBanner from '../../components/LogosBanner/LogosBanner'
import Experiencias from '../../components/Experiencias/Experiencias'
import Projetos from '../../components/Projetos/Projetos'
import Services from '../../components/Services/Services'
import Footer from '../../components/Footer/Footer'
import Background from '../../components/Background/Background'

function Home() {
    return (
        <div className="main">
            <Header />
            <HeaderMobile />
            <Background />

            <div className="content">
                <Hero />
                <LogosBanner />
                <Experiencias />
                <Projetos />
                <Services />
                <Footer />
            </div>
        </div>
    )
}

export default Home
