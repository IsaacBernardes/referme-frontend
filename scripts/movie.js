var movieId;

function onStart() {
	movieId = window.localStorage.getItem("MOVIE_ID"); 

  if (movieId == null) {
    return;
  }

  movieId = parseInt(movieId, 10);
  findMovieDetails(movieId, requestHandler);
}

function requestHandler(response) {
  const movieData = response.result;
  
  const moviePoster = document.getElementById("movie-poster");
  moviePoster.src = movieData.image;
  
  const movieTitle = document.getElementById("movie-title");
  movieTitle.innerText = movieData.name;
  
  const movieSynopsis = document.getElementById("movie-synopsis");
  movieSynopsis.innerText = movieData.synopsis;
  
  const movieTrailerURL = document.getElementById("movie_trailer_url");
  movieTrailerURL.href = movieData.trailerURL;

  const fileReader = new TizenFileReader();

	fileReader.readFile('profiles.json', (result) => {
		const profiles = JSON.parse(result ?? "[]");
    const username = window.localStorage.getItem("USERNAME");

    const userIndex = profiles.findIndex(el => el.name == username);
    console.log(result, userIndex);
    if (userIndex >= 0) {

      console.log(profiles[userIndex]);

      const userData = profiles[userIndex];

      if (userData.likedMovies == null) {
        userData.likedMovies = [];
      }

      if (userData.dislikedMovies == null) {
        userData.dislikedMovies = [];
      }
      
      if (userData.likedMovies.includes(movieId)) {
        $("#like-option").show()
        $("#uf-like-option").hide()
        $("#unlike-option").hide()
        $("#uf-unlike-option").show()
      } else if (userData.dislikedMovies.includes(movieId)) {
        $("#like-option").hide()
        $("#uf-like-option").show()
        $("#unlike-option").show()
        $("#uf-unlike-option").hide()
      }

    }
	});
}

function likeMovie() {

  const fileReader = new TizenFileReader();

	fileReader.readFile('profiles.json', (result) => {
		const profiles = JSON.parse(result ?? "[]");
    const username = window.localStorage.getItem("USERNAME");

    const userIndex = profiles.findIndex(el => el.name == username);
    if (userIndex >= 0) {

      const userData = profiles[userIndex];

      if (userData.likedMovies == null) {
        userData.likedMovies = [];
      }

      if (userData.dislikedMovies == null) {
        userData.dislikedMovies = [];
      }
      
      const dislikedIndex = userData.dislikedMovies.findIndex(el => el === movieId);
      if (dislikedIndex >= 0) {
        userData.dislikedMovies.splice(dislikedIndex, 1);
      }

      if (!userData.likedMovies.includes(movieId)) {
        userData.likedMovies.push(movieId);
      }

      profiles[userIndex] = userData;
      fileReader.writeFile('profiles.json', JSON.stringify(profiles), () => {});
    }
	});
	
  $("#like-option").show()
  $("#uf-like-option").hide()
  $("#unlike-option").hide()
  $("#uf-unlike-option").show()

  const newFocusElement = document.getElementById("like-option"); 
  forceFocus(newFocusElement);
}

function deslikeMovie() {

  const fileReader = new TizenFileReader();

	fileReader.readFile('profiles.json', (result) => {
		const profiles = JSON.parse(result ?? "[]");
    const username = window.localStorage.getItem("USERNAME");

    const userIndex = profiles.findIndex(el => el.name == username);
    if (userIndex >= 0) {

      const userData = profiles[userIndex];

      if (userData.likedMovies == null) {
        userData.likedMovies = [];
      }

      if (userData.dislikedMovies == null) {
        userData.dislikedMovies = [];
      }
      
      const likedIndex = userData.likedMovies.findIndex(el => el === movieId);
      if (likedIndex >= 0) {
        userData.likedMovies.splice(likedIndex, 1);
      }

      if (!userData.dislikedMovies.includes(movieId)) {
        userData.dislikedMovies.push(movieId);
      }

      profiles[userIndex] = userData;
      fileReader.writeFile('profiles.json', JSON.stringify(profiles), () => {});
    }
	});

  $("#like-option").hide()
  $("#uf-like-option").show()
  $("#unlike-option").show()
  $("#uf-unlike-option").hide()

  const newFocusElement = document.getElementById("unlike-option"); 
  forceFocus(newFocusElement);
}

function removeAvaliation() {

  const fileReader = new TizenFileReader();

	fileReader.readFile('profiles.json', (result) => {
		const profiles = JSON.parse(result ?? "[]");
    const username = window.localStorage.getItem("USERNAME");

    const userIndex = profiles.findIndex(el => el.name == username);
    if (userIndex >= 0) {

      const userData = profiles[userIndex];

      if (userData.likedMovies == null) {
        userData.likedMovies = [];
      }

      if (userData.dislikedMovies == null) {
        userData.dislikedMovies = [];
      }
      
      const likedIndex = userData.likedMovies.findIndex(el => el === movieId);
      if (likedIndex >= 0) {
        userData.likedMovies.splice(likedIndex, 1);
      }

      const dislikedIndex = userData.dislikedMovies.findIndex(el => el === movieId);
      if (dislikedIndex >= 0) {
        userData.dislikedMovies.splice(dislikedIndex, 1);
      }

      profiles[userIndex] = userData;
      fileReader.writeFile('profiles.json', JSON.stringify(profiles), () => {});
    }
	});

  $("#like-option").hide()
  $("#uf-like-option").show()
  $("#unlike-option").hide()
  $("#uf-unlike-option").show()
}

onStart();