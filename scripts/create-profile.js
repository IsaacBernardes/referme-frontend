
function save() {
	const name = document.getElementById("name-form").value;
	const birthday = document.getElementById("birthday-form").value;
	const favorite = document.getElementById("favorite-form").value;

	const data = {
		name,
		birthday,
		favorite
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

	// tizen.filesystem.resolve('documents/refer-me', function(dir) {

	// 	let profiles;
	// 	if (!tizen.filesystem.pathExists('documents/refer-me/profiles.json')) {
	// 		dir.createFile('profiles.json');
	// 		profiles = [];
	// 	} else {
	// 		const rFile = dir.resolve('profiles.json')
	// 		rFile.openStream("r", function(fs) {
	// 			profiles = JSON.parse(fs.read(rFile.fileSize) ?? "[]");
	// 			fs.close();
				
				

	// 			const wFile = dir.resolve('profiles.json');
	// 			wFile.openStream("w", function(fs) {
	// 				fs.write(JSON.stringify(profiles));
	// 				fs.close();
	// 			}, function(e) {
	// 				console.error("Error " + e.message);
	// 				throw e;
	// 			}, "UTF-8");

	// 		}, function(e) {
	// 			console.error("Error " + e.message);
	// 			throw e;
	// 		}, "UTF-8");
	// 	}

	// });
}