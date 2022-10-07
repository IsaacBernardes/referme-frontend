
function save() {
	const name = document.getElementById("name-form").value;
	const birthday = document.getElementById("birthday-form").value;
	const favorite = document.getElementById("favorite-form").value;

	const data = {
		name: name,
		birthday: birthday,
		favorite: favorite,
		likedMovies: [],
		dislikedMovies: []
	}

	const fileReader = new TizenFileReader();

	fileReader.readFile('profiles.json', (result) => {
		const profiles = JSON.parse(result ?? "[]");
		profiles.push(data);
		fileReader.writeFile('profiles.json', JSON.stringify(profiles), () => {
			fileReader.readFile('profiles.json', (completeResult) => {
				console.log(JSON.parse(completeResult));
			});
		});
	});
}