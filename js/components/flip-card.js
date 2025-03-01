// flip-card.js

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .flip-card {
      background-color: transparent;
      width: 100%;
      height: 430px;
      margin-top: 60px;
      transform: translateZ(0);
      perspective: 800px;
      
    }

    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }
    .flip-horizontal-left .flip-card-inner {
        transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .flip-horizontal-left:hover .flip-card-inner {
        transform: rotateY(-180deg);
        
    }

    .flip-horizontal-left .flip-card-back {
        transform: rotateY(-180deg);
        transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .flip-card-front,
    .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    .flip-card-front img,
    .flip-card-back img {
      width: 100%;
      height: 60%;
      border-radius: 0.5rem;
      object-fit: cover;
    }
    .project {
        min-height: 94%;
        background-color: var(--base-logo);
        padding: 0.8rem;
        border-radius: 0.5rem;
        box-shadow:  0px 0px 25px rgba(43, 43, 43, 0.521);
    }

    .project h3 {
        font-size: 1.25rem;
        font-weight: bold;
        margin-top: 1rem;
    }
    .project p {
        color: #a0aec0;
    }
  </style>


  <div class="flip-card flip-horizontal-left">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="project">
          <img id="front-image" alt="">
          <h3 id="front-title"></h3>
          <p id="front-description"></p>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="project">
          <h3 id="back-title"></h3>
          <p id="back-description"></p>
        </div>
      </div>
    </div>
  </div>
`;

class FlipCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('#front-image').src = this.getAttribute('front-image')
    this.shadowRoot.querySelector('#front-image').alt = this.getAttribute('front-image-alt')

    this.shadowRoot.querySelector('#front-title').textContent = this.getAttribute('front-title');
    this.shadowRoot.querySelector('#front-description').textContent = this.getAttribute('front-description');

    this.shadowRoot.querySelector('#back-title').textContent = this.getAttribute('back-title');
    this.shadowRoot.querySelector('#back-description').textContent = this.getAttribute('back-description');
  }

  connectedCallback() {

  }

  static get observedAttributes() {
    return ['front-image','front-image-alt', 'front-title', 'front-description', 'back-title', 'back-description'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Atualiza as propriedades quando os atributos mudam
    if (name === 'front-image') {
        this.shadowRoot.querySelector('#front-image').src = newValue;
    }
    if (name === 'front-image-alt') {
        this.shadowRoot.querySelector('#front-image').alt = newValue;
    }
    if (name === 'front-title') {
        this.shadowRoot.querySelector('#front-title').textContent = newValue;
    }
    if (name === 'front-description') {
        this.shadowRoot.querySelector('#front-description').textContent = newValue;
    }

    if (name === 'back-title') {
        this.shadowRoot.querySelector('#back-title').textContent = newValue;
    }
    if (name === 'back-description') {
        this.shadowRoot.querySelector('#back-description').textContent = newValue;
    }
  }
}

window.customElements.define('flip-card', FlipCard);
