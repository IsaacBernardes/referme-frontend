var profiles = [];

function onSuccessRead(text) {
  profiles = JSON.parse(text ?? "[]");
	console.log(profiles);
}

document.onreadystatechange = (ev) => {

	// READ FILE IF EXIST
	fileReader = new TizenFileReader();
	fileReader.readFile('profiles.json', onSuccessRead);

}