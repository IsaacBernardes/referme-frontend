function getReferences() {
  const fileReader = new TizenFileReader();
  
  fileReader.readFile('profiles.json', (result) => {
    const profiles = JSON.parse(result ?? "[]");
    const username = window.localStorage.getItem("USERNAME");

    const userIndex = profiles.findIndex(el => el.name == username);
    console.log(result, userIndex);
    if (userIndex >= 0) {
      const userData = profiles[userIndex];

      if (userData.likedMovies == null) {
        userData.likedMovies = [];
      }

      if (userData.dislikedMovies == null) {
        userData.dislikedMovies = [];
      }

      listReferences(userData.likedMovies.join(","), userData.dislikedMovies.join(","), getMoviesResult)
    }
  });
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
	  }
	  movieListDiv.appendChild(movieCard);
	}
	
	loadUIComponents();
}

getReferences()