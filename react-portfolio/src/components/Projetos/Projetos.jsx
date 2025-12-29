import FlipCard from '../FlipCard/FlipCard'
import styles from './Projetos.module.css'
import p1Img from '../../assets/img/projects/p1.webp'
import p2Img from '../../assets/img/projects/p2.webp'
import p3Img from '../../assets/img/projects/p3.webp'
import { useProjects } from '../../hooks/useProjects'

function Projetos() {
    const { projects, loading } = useProjects();

    const projetosEstaticos = [
        {
            frontImage: p1Img,
            frontImageAlt: "dashboard do sistema de gestão rrbec",
            frontTitle: "RRBEC",
            frontDescription: "Gestão de bares e restaurantes",
            backTitle: "RRBEC",
            githubLink: "https://github.com/welton89/RRBEC",
            backDescription: `Este projeto é uma aplicação web desenvolvida em Django com o objetivo de explorar as funcionalidades 
        e recursos desse framework. A aplicação visa simular um sistema de gestão para bares e restaurantes,
        abrangendo desde o cadastro de produtos e clientes até a geração de relatórios de vendas.
        Inicialmente era apenas um projeto para estudos, mas devido a uma carência de um estabelecimento, hoje é um projeto funcional. 
        Embora jovem, o sistema se provou significativamente superior ao que se utilizavam,
        principalmente em estabilidade, velocidade, usabilidade e confiabilidade.`
        },
        {
            frontImage: p2Img,
            frontImageAlt: "Projeto de design UI/UX",
            frontTitle: "AirPub",
            frontDescription: "Sistema de tickets para restaurantes",
            backTitle: "AirPub",
            githubLink: "https://github.com/victorgrodriguesm7/aipub2",
            backDescription: `O AirPub é um aplicativo para bares e 
        casas noturnas que visa substituir as comandas tradicionais.
        Com ele, o cliente pode comprar tickets de forma simples e segura,
        evitando filas para pagamento, multa por perda da comanda,
        surpresas no valor final e constrangimentos na hora de pagar.
        O aplicativo funciona como uma carteira de tickets. 
        Para usar, basta escolher os produtos no cardápio,
        adicionar ao carrinho, efetuar o pagamento via PIX ou cartão,
        ir na carteira de tickets, escolher qual usar e tocar para
        mostrar o QrCode ao funcionário do local, que fará a leitura
        para efetuar a troca pelo produto.`
        },
        {
            frontImage: p3Img,
            frontImageAlt: "",
            frontTitle: "Chat2P",
            frontDescription: "Cliente de chat para protocolo Matrix",
            backTitle: "Chat2P",
            githubLink: "https://github.com/welton89/chat2P",
            backDescription: `Projeto mobile de um cliente de chat para o protocolo Matrix
        com o objetivo de aprender Flutter. No app é possivel fazer login, enviar e receber 
        mensagens em tempo real, criar grupos, canais, apagar mensagens, reenviar em caso 
        de erro, apagar conversas, buscar usurários, contabilizar mensagens não lidas, 
        idicador de mensagem recebida e lida, envio de midia, e muito mais`
        },
        {
            frontImage: "https://github.com/welton89/Comanda-pre/raw/master/img.png",
            frontImageAlt: "",
            frontTitle: "Comanda pre-paga",
            frontDescription: "Comanda digital para casas noturnas e bares",
            backTitle: "Comanda pre-paga",
            backDescription: `Projeto pensado para casas noturnas e bares,
        onde o cliente recebe um cartão com o codigo único podendo adiconar 
        valor para o consumo no resínduo, e ao final da noite recupar o valor 
        restante. Podendo tambem ser ultilizado como uma 'carteirinha fidelidade'.
        Tudo fica registrado em uma tabela sql, inclusive todas as movimentações 
        de entrada e saída. O projeto ainda está em desenvolvimento e as próximas 
        atualizações serão voltadas nas seguintes tarefas:
        Editar usuário do sistema
        Editar produtos
        Elaborar relatórios
        Adicionar opção de envio de relatório por e-mail
        BackUp do banco de dados em nuvem`
        }
    ];

    // Mapeia os projetos do Gun.js para o formato do FlipCard
    const projetosDinamicos = projects.map(p => ({
        frontImage: p.imagem,
        frontImageAlt: p.title,
        frontTitle: p.title,
        frontDescription: p.subtitle,
        backTitle: p.title,
        githubLink: p.linkRepositorio,
        backDescription: p.descricao
    }));

    const listaFinal = projetosDinamicos.length > 0 ? projetosDinamicos : projetosEstaticos;

    return (
        <>
            <div id="projects"></div>
            <section className={styles.section}>
                <h2>Alguns projetos</h2>
                <div className={styles.projects}>
                    {listaFinal.map((projeto, index) => (
                        <FlipCard key={index} {...projeto} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Projetos
