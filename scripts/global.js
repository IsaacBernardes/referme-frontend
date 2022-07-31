class Navbar extends HTMLElement {

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
        <div style="display: flex; justify-content: space-between; padding: 1rem; align-items: center; background: rgba(125, 125, 125, 0.2);">
            <img style="height: 2rem" src="./assets/logo.svg">
            <div style="display: flex; column-gap: .75rem; color: #FFF">
                <span>Em Alta</span>
                <span>Indicações</span>
                <span>Procurar</span>
            </div>
        </div>
        `;
    }
}

customElements.get('nav-bar') || customElements.define('nav-bar', Navbar);