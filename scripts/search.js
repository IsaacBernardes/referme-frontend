page = 0;

function getData() {
  listMovies(0, getMoviesResult)
}

function getMoviesResult(response) {
	
	result = response.result;
	
	const movieListDiv = document.getElementById("movie-list");
	movieListDiv.innerHTML = "";
	
	for (const movie of result) {
	  const movieCard = document.createElement('movie-card');
	  movieCard.setAttribute('data-role', 'ui-option');
	  movieCard.setAttribute('data-object', JSON.stringify(movie));
	  movieCard.onclick = (el) => {
	  	const shadowRoot = el.target.shadowRoot;
	  	shadowRoot.getElementById("poster").click();
	   	modalOpened = shadowRoot.getElementById("overlay");
	  }
	  movieListDiv.appendChild(movieCard);
	}
	
	loadUIComponents();
}


function toggleFilters() {
  const filterRow = document.getElementById("filter-row");
  
  if (filterRow.style.display == "none") {
	  filterRow.style.display = "flex";
	  for (let el of filterRow.children) {
		  el.setAttribute("data-role", "ui-option");
	  }
  } else {
	  filterRow.style.display = "none";
	  for (let el of filterRow.children) {
		  el.removeAttribute("data-role");
	  }
  }
  
  loadUIComponents();
}

getData();