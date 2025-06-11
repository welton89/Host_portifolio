class HeadTag extends HTMLElement {
    constructor() {
        super();   
    }

  connectedCallback() {
        // Garante que os elementos sejam adicionados apenas uma vez ou atualizados corretamente.
        this._updateMetaAndLinks();
        this._updateTitle();
    }

 
    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title' && oldValue !== newValue && this.isConnected) {
            this._updateTitle();
            // Atualiza a tag og:title se ela existir e o título principal mudar
            const ogTitleMeta = document.head.querySelector('meta[property="og:title"]');
            if (ogTitleMeta) {
                ogTitleMeta.setAttribute('content', `${newValue || 'Blog'} - Welton Moura`);
            }
        }
    }

    _updateTitle() {
        const pageSpecificTitle = this.getAttribute('title') || 'Blog';
        document.title = `${pageSpecificTitle} - Welton Moura`;
    }

    _updateMetaAndLinks() {
        const headElementsConfig = [
            { tag: 'meta', attributes: { charset: 'utf-8' }, uniqueKeyAttr: 'charset' },
            { tag: 'meta', attributes: { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, uniqueKeyAttr: 'name' },
            { tag: 'meta', attributes: { name: 'description', content: 'Portfólio de Welton Moura, desenvolvedor full stack com experiência em web, mobile e design UI/UX. Conheça meus projetos e habilidades.' }, uniqueKeyAttr: 'name' },
            { tag: 'meta', attributes: { name: 'keywords', content: 'desenvolvedor full stack, portfolio, welton moura, desenvolvimento web, desenvolvimento mobile, UI/UX, Django, Flutter, JavaScript, HTML, CSS, projetos, experiência' }, uniqueKeyAttr: 'name' },
            { tag: 'meta', attributes: { name: 'author', content: 'Welton Moura' }, uniqueKeyAttr: 'name' },
            { tag: 'meta', attributes: { name: 'copyright', content: '© 2025 Welton Moura' }, uniqueKeyAttr: 'name' },
            { tag: 'meta', attributes: { property: 'og:site_name', content: 'Portfólio - Welton Moura' }, uniqueKeyAttr: 'property' },
            { tag: 'meta', attributes: { property: 'og:title', content: `${this.getAttribute('title') || 'Blog'} - Welton Moura` }, uniqueKeyAttr: 'property' },
            { tag: 'meta', attributes: { property: 'og:description', content: 'Desenvolvedor full stack com experiência em web, mobile e design UI/UX. Conheça meus projetos e habilidades.' }, uniqueKeyAttr: 'property' },
            { tag: 'meta', attributes: { property: 'og:image', content: 'assets/img/OpenGraph.png' }, uniqueKeyAttr: 'property' }, // Certifique-se que o caminho está correto
            { tag: 'meta', attributes: { property: 'og:url', content: 'https://weltonmoura.com.br/' }, uniqueKeyAttr: 'property' },
            { tag: 'meta', attributes: { property: 'og:type', content: 'website' }, uniqueKeyAttr: 'property' },
            { tag: 'meta', attributes: { name: 'theme-color', content: '#fbbf24' }, uniqueKeyAttr: 'name' },
            { tag: 'meta', attributes: { name: 'mobile-web-app-capable', content: 'yes' }, uniqueKeyAttr: 'name' },
            { tag: 'link', attributes: { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }, uniqueKeyAttr: 'href' },
            { tag: 'link', attributes: { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }, uniqueKeyAttr: 'href' },
            { tag: 'link', attributes: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' }, uniqueKeyAttr: 'href' },
        ];

        headElementsConfig.forEach(config => {
            let selector;
            if (config.uniqueKeyAttr === 'charset') {
                selector = 'meta[charset]';
            } else {
                // Constrói um seletor para verificar se o elemento já existe, baseado no atributo chave (name, property, href)
                selector = `${config.tag}[${config.uniqueKeyAttr}="${config.attributes[config.uniqueKeyAttr]}"]`;
            }

            if (!document.head.querySelector(selector)) {
                const element = document.createElement(config.tag);
                for (const attr in config.attributes) {
                    element.setAttribute(attr, config.attributes[attr]);
                }
                document.head.appendChild(element);
            }
        });
    }
}

customElements.define('head-tag', HeadTag);
