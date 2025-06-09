class NavbarTag extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create a shadow DOM

        const title = this.getAttribute('title') || 'Blog'; // Get the title attribute or default to 'Blog'

        this.shadowRoot.innerHTML = `
   

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="../../css/style.css">

        <style>
        .header {
            margin-left:-650px;
            margin-right:20px;

            }
        .header-mobile {
            margin-left:-220px;

            }
            .nav-links {
            margin-left:-90px;
            margin-right:0px;

            }
        
        </style>
            <header class="header animate__animated animate__slideInDown">
                <div class="logo">
                    <i class="fas fa-user-circle"></i>
                    <span>${title}</span>
                </div>
                <nav>
                    <a href="/">Home</a>
                    <a href="/portfolio">Portfólio</a>
                    <a href="/projects">Projetos</a>
                    <a href="/lab">Laboratório</a>
                    <a href="#contacts">Contato</a>
                </nav>
            </header>

            <div class="header-mobile animate__animated animate__slideInDown">
                <div class="logo">
                    <i class="fas fa-user-circle"></i>
                    <span>${title}</span>
                </div>
                <button class="nav-toggle">
                    <i class="fas fa-bars"></i>
                </button>
                <nav id="nav-links" class="nav-links">
                    <a href="/">Home</a>
                    <a href="/portfolio">Portfólio</a>
                    <a href="/projects">Projetos</a>
                    <a href="/lab">Laboratório</a>
                    <a href="#contacts">Contato</a>
                </nav>
            </div>


        `;

  
        // Mobile menu toggle logic
        this.navToggle = this.shadowRoot.querySelector('.nav-toggle');
        this.navLinks = this.shadowRoot.querySelector('#nav-links');
        this._boundHandleOutsideClick = this._handleOutsideClick.bind(this);

        if (this.navToggle && this.navLinks) {
            this.navToggle.addEventListener('click', () => {
                this.navLinks.classList.toggle('active');
            });

            // Close mobile menu when a link is clicked (optional)
            this.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.navLinks) {
                        this.navLinks.classList.remove('active');
                    }
                });
            });
        }
    }

    connectedCallback() {
        document.addEventListener('click', this._boundHandleOutsideClick);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._boundHandleOutsideClick);
    }

    _handleOutsideClick(event) {
        if (this.navLinks && this.navLinks.classList.contains('active') && this.navToggle) {
            const path = event.composedPath();
            // Check if the click path does not include the toggle button or the nav links container
            if (!path.includes(this.navToggle) && !path.includes(this.navLinks)) {
                this.navLinks.classList.remove('active');
            }
        }
    }
}

customElements.define('navbar-tag', NavbarTag);
// window.customElements.define('navbar-tag', NavbarTag);
