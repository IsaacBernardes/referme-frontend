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
    	
    	let movieProps = this.getAttribute('data-object');

        if (movieProps) {
            movieProps = JSON.parse(movieProps);
        } else {
            this.shadow.innerHTML = `
            <div id="poster" style="display: flex; width: 6rem; height: 8rem; background-color: #C4C4C4"></div>
            `
            return;
        }
    	
        this.shadow.innerHTML = `
        <div id="poster" style="display: flex; width: 6rem; height: 8rem; background-color: #C4C4C4">
            <img src="${movieProps.image}" style="width: 100%; height: 100%;">
        </div>
        <div id="overlay" class="movie-overlay">
            <div class="overlay-card">
                <img src="${movieProps.image}" loading="lazy" width="100%">
                <div style="display: flex; flex-direction: column">
                	<span class="movie-title">${movieProps.name}</span>
                	<div id="star-row" class="star-row"></div>
                    <div class="sinopse-row">
                        <label>Sinopse</label>
                        <span class="sinopse">${movieProps.sinopse}</span>
                    </div>
                    <div class="sinopse-row">
                        <label>Disponível em:</label>
                        <div id="platforms-row" class="platforms-row">
                        </div>
                    </div>
                    <div style="margin-top: auto">
                        <a class="yellow-btn" href="${movieProps.trailerURL}" targer="_blank">Assistir Trailer</a>
                    </div>
                </div>
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
            	backdrop-filter: blur(4px);
            	background: rgba(0, 0, 0, 0.8);
            }
            .overlay-card {
                background: rgba(38, 38, 38, 0.8);
                width: 80vw;
                min-width: 70%;
                min-height: 70%;
                border-radius: 1rem;
            	padding: 1rem;
            	display: grid;
            	grid-template-columns: 40% 60%;
            	column-gap: 0.5rem;
            }
            .movie-title {
                font-family: 'Jura', sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 1.6rem;
                color: #FFFFFF;
            }
            .star-row {
            	display: flex;
            	column-gap: 0.5rem;
            }
            .star-row .material-icons {
            	color: #FDAD00;
        		box-shadow: 0px 4px 51px 0px #00000080;
            }
            .sinopse-row {
                display: flex;
                flex-direction: column;
                color: #FFFFFF;
                max-height: 15rem;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 1rem;
            }
            .sinopse-row label {
                font-weight: 700;
            }
            .yellow-btn {
                padding: 0.75rem 1rem;
                color: #FFF;
                background-color: #FDAD00;
                text-decoration: none;
                font-size: 1rem;
                font-weight: 700;
                line-height: 2.8rem;
            }
        </style>
        `;

        const starRow = this.shadow.getElementById("star-row");
        for (let i = 0; i < movieProps.score; i++) {
            const starImg = document.createElement("img");
            starImg.src = "assets/Star.svg"
            starRow.append(starImg);
        }


        const platformsRow = this.shadow.getElementById("platforms-row");
        const platformMapping = {
            "Netflix": "assets/Netflix.png",
            "Disney": "assets/Disney.png"
        }
        for (const platform of movieProps.platforms) {
            const platformImg = document.createElement('img');
            platformImg.src = platformMapping[platform];
            platformsRow.append(platformImg);
        }

        this.removeAttribute("data-object");
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