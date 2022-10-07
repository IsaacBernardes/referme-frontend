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

	
function listMovies(page, handler) {
	
	const settings = {
		method: 'GET'
	}
	
	fetch(backendURL + "/movies?page=" + page, settings)
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