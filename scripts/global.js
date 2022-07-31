class Navbar extends HTMLElement {

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
    	
    	const selected = this.getAttribute('data-selected');
    	
        this.shadow.innerHTML = `
        <div style="display: flex; justify-content: space-between; padding: 1rem; align-items: center; background: rgba(125, 125, 125, 0.2);">
            <img style="height: 2rem" src="./assets/logo.svg">
            <div style="display: flex; column-gap: 1rem; color: #FFF; font-size: 1rem">
                <span style="${selected == "trendings" ? 'color: #FDAD00' : ''}">Em Alta</span>
                <span style="${selected == "recommendations" ? 'color: #FDAD00' : ''}">Indicações</span>
                <span style="${selected == "search" ? 'color: #FDAD00' : ''}">Procurar</span>
            </div>
        </div>
        `;
    }
}

customElements.get('nav-bar') || customElements.define('nav-bar', Navbar);