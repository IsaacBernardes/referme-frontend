var backendURL = "http://192.168.0.111:8090/api"

	
function listTrendingMovies(handler) {
	
	const settings = {
		method: 'GET'
	}
	
	fetch(backendURL + "/trends", settings)
	.then(function(response) { return response.json() })
	.then(function(result) {
		handler(result);
	})
	.catch(function(error) {
	  console.log('There has been a problem with your fetch operation: ' + error.message);
	});
	
}


function listReferences(likes, dislikes, handler) {
	
	const settings = {
		method: 'GET'
	}
	
	fetch(backendURL + "/refer?likes=" + likes + "&dislikes=" + dislikes, settings)
	.then(function(response) { return response.json() })
	.then(function(result) {
		handler(result);
	})
	.catch(function(error) {
	  console.log('There has been a problem with your fetch operation: ' + error.message);
	});
	
}

	
function listMovies(page, search, handler) {
	
	const settings = {
		method: 'GET'
	}

	const pathUrl = backendURL + "/movies"
					  		+ "?page=" + page
								+ "&search=" + search
	
	fetch(pathUrl, settings)
	.then(function(response) { return response.json() })
	.then(function(result) {
		handler(result);
	})
	.catch(function(error) {
	  console.log('There has been a problem with your fetch operation: ' + error.message);
	});
	
}

function findMovieDetails(movieId, handler) {
	
	const settings = {
		method: 'GET'
	}
	
	fetch(backendURL + "/movies/" + movieId, settings)
	.then(function(response) { return response.json() })
	.then(function(result) {
		handler(result);
	})
	.catch(function(error) {
	  console.log('There has been a problem with your fetch operation: ' + error.message);
	});
	
}

function listGenres(handler) {
	
	const settings = {
		method: 'GET'
	}
	
	fetch(backendURL + "/genres", settings)
	.then(function(response) { return response.json() })
	.then(function(result) {
		handler(result);
	})
	.catch(function(error) {
	  console.log('There has been a problem with your fetch operation: ' + error.message);
	});
}

function listPlatforms(handler) {
	
	const settings = {
		method: 'GET'
	}
	
	fetch(backendURL + "/platforms", settings)
	.then(function(response) { return response.json() })
	.then(function(result) {
		handler(result);
	})
	.catch(function(error) {
	  console.log('There has been a problem with your fetch operation: ' + error.message);
	});
}