function getTrendingMovies() {
	listTrendingMovies(buildTrendings)
}

function buildTrendings(response) {
	
	result = response.result;
	
	const movieListDiv = document.getElementById("trendings-sections");
	movieListDiv.innerHTML = "";
	
	const sections = {}
	const sectionElements = []
	
	for (const movie of result) {
	  const movieCard = document.createElement('movie-card');

	  if (!(movie["genres"][0] in sections)) {
	      sections[movie["genres"][0]] = [] 
	  }
	  
	  movieCard.setAttribute('data-role', 'ui-option');
	  movieCard.setAttribute('data-object', JSON.stringify(movie));
	  movieCard.onclick = (el) => {
	  	const shadowRoot = el.target.shadowRoot;
	  	shadowRoot.getElementById("poster").click();
	   	modalOpened = shadowRoot.getElementById("overlay");
	  }
	  sections[movie["genres"][0]].push(movieCard);
	}
	
	
	for (const [index, key] of Object.keys(sections).entries()) {
		const sectionTitle = "Os mais assistidos da categoria: " + key;
		
		const fatherDiv = document.createElement("div");
		fatherDiv.className = `d-flex flex-column appear-delayed-${index+1 > 4 ? 4 : index+1}`;
		
		const sectionLabel = document.createElement("label");
		sectionLabel.className = "section-label"
			sectionLabel.innerText = sectionTitle;
		
		const sectionMovies = document.createElement("div");
		sectionMovies.className = "d-flex gap-3 w-100";
		
		for (const movie of sections[key]) {
			sectionMovies.appendChild(movie);
		}
		
		fatherDiv.appendChild(sectionLabel);
		fatherDiv.appendChild(sectionMovies);
		
		movieListDiv.appendChild(fatherDiv);
	}
	
	loadUIComponents();
}


getTrendingMovies()