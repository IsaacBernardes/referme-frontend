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
                <span style="${selected == "trendings" ? 'color: #FDAD00' : ''}" data-role="ui-option" onclick="redirectTo('trendings')" ${selected == "trendings" ? 'firstFocus' : ''}>Em Alta</span>
                <span style="${selected == "recommendations" ? 'color: #FDAD00' : ''}" data-role="ui-option" onclick="redirectTo('recommendations')" ${selected == "recommendations" ? 'firstFocus' : ''}>Indicações</span>
                <span style="${selected == "search" ? 'color: #FDAD00' : ''}" data-role="ui-option" onclick="redirectTo('search')" ${selected == "search" ? 'firstFocus' : ''}>Procurar</span>
            </div>
        </div>
        <style>
	        *.focus {
	        	box-shadow: 0px 0px 20px 20px rgba(0, 238, 253, 0.25) !important;
	        	background-color: rgba(0, 238, 253, 0.25);
	        	border: 0;
	        	outline: 0;
	        }
        </style>
        `;
    }
}


class MovieCard extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
        this.movieId = null;
    }

    connectedCallback() {
        this.render();

        const poster = this.shadow.getElementById("poster");
        poster.addEventListener("click", () => {
        	redirectTo('movie')
            selectMovie(this.movieId)
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

        this.movieId = movieProps.id;
        console.log(this.movieId);
        this.shadow.innerHTML = `
        <div id="poster" style="display: flex; width: 6rem; height: 8rem; background-color: #C4C4C4">
            <img src="${movieProps.image}" style="width: 100%; height: 100%;">
        </div>`;

//        const starRow = this.shadow.getElementById("star-row");
//        for (let i = 0; i < movieProps.score; i++) {
//            const starImg = document.createElement("img");
//            starImg.src = "assets/Star.svg"
//            starRow.append(starImg);
//        }


//        const platformsRow = this.shadow.getElementById("platforms-row");
//        const platformMapping = {
//            "Netflix": "assets/Netflix.png",
//            "Disney": "assets/Disney.png"
//        }
        
//        if (movieProps.platforms != null) {
//	        for (const platform of movieProps.platforms) {
//	            const platformImg = document.createElement('img');
//	            platformImg.src = platformMapping[platform];
//	            platformsRow.append(platformImg);
//	        }
//        }

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


function redirectTo(page) {
	let returnList = window.localStorage.getItem("RETURN_LIST");
    returnList = returnList == null ? [] : JSON.parse(returnList);
    returnList.push(window.location.href);
    window.localStorage.setItem("RETURN_LIST", JSON.stringify(returnList));
	
	window.location.href = page + ".html"
}

function selectMovie(movieId) {
    window.localStorage.setItem("MOVIE_ID", String(movieId));
    redirectTo('movie');
}