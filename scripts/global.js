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


class MovieCard extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        this.render();

        const poster = this.shadow.getElementById("poster");
        poster.addEventListener("click", () => {
            const aux = this.shadow.getElementById("overlay");
            aux.style.display = 'flex';
        });

        const overlay = this.shadow.getElementById("overlay");
        overlay.addEventListener("click", () => {
            const aux = this.shadow.getElementById("overlay");
            aux.style.display = 'none';
        });
    }

    render() {
    	
    	const selected = this.getAttribute('data-id');
    	const image = this.getAttribute('data-image');
    	
        this.shadow.innerHTML = `
        <div id="poster" style="display: flex; width: 6rem; height: 8rem; background-color: #C4C4C4">
            <img src="${image}" style="width: 100%; height: 100%;">
        </div>
        <div id="overlay" class="movie-overlay">
            <div class="overlay-card">
                AI AI AI AI AI AIIII
            </div>
        </div>
        <style>
            .movie-overlay {
                display: none;
                position: absolute;
                width: 100vw;
                height: 100vh;
                z-index: 100;
                top: 0;
                left: 0;
                justify-content: center;
                align-items: center;
            }
            .overlay-card {
                background: rgba(38, 38, 38, 0.8);
                min-width: 60%;
                min-height: 60%;
                backdrop-filter: blur(5px);
                border-radius: 1rem;
            }
        </style>
        `;
    }
}


class TizenFileReader {
    
    constructor() {
        this.verifyStruct();
    }

    verifyStruct() {
        if (!tizen.filesystem.pathExists("documents/refer-me")) {
            dir.createDirectory('refer-me');
        };
    }

    exists(fileName) {
        return tizen.filesystem.pathExists(`documents/refer-me/${fileName}`);
    }

    writeFile(fileName, text, callback=null) {

        tizen.filesystem.resolve('documents/refer-me', function(dir) {
            if (!tizen.filesystem.pathExists(`documents/refer-me/${fileName}`)) {
                dir.createFile(fileName);
            };
            
            let wFile = dir.resolve(fileName);
            wFile.openStream("w", function(fs) {
                fs.write(text);
                fs.close();

                if (callback != null) {
                    callback();
                }
            }, function(e) {
                console.error("Error " + e.message);
                throw e;
            }, "UTF-8");
        });
    }

    readFile(fileName, callback=null) {
        if (!tizen.filesystem.pathExists(`documents/refer-me/${fileName}`)) {
            return null;
        };

        return tizen.filesystem.resolve('documents/refer-me', function(dir) {
            let rFile = dir.resolve(fileName);
            rFile.openStream("r", function(fs) {
                const data = fs.read(rFile.fileSize);
                fs.close();

                if (callback != null) {
                    callback(data);
                }
            }, function(e) {
                console.error("Error " + e.message);
                throw e;
            }, "UTF-8");
        });
    }


}

customElements.get('movie-card') || customElements.define('movie-card', MovieCard);
customElements.get('nav-bar') || customElements.define('nav-bar', Navbar);