var profiles = [];

function onSuccessRead(text) {
  profiles = JSON.parse(text ?? "[]");


	if (profiles.length > 0) {
	
		profilesHTML = ""
		for (const profile of profiles) {
			profilesHTML += `
			<div class="d-flex flex-column align-items-center justify-content-center gap-3 appear" style="width: auto;" data-role="ui-option" onclick="redirectTo('trendings')">
				<div style="background-color: #D9D9D9; border-radius: 100%; width: 7rem; height: 7rem; overflow: hidden;">
					<img src="assets/person-1.jpg" style="width: 100%; height: 100%">
				</div>
				<span style="color: #FFFFFF; font-family: 'Inter'; font-size: 1.2rem;">${profile.name}</span>
			</div>
			`
		}

		const profileListHTML = document.getElementById("has-profiles");
		profileListHTML.innerHTML = profilesHTML;
		profileListHTML.style.display = "flex";

	} else {
		const profileListHTML = document.getElementById("no-profiles");
		profileListHTML.style.display = "flex";
	}
	
	loadUIComponents();
}

document.onreadystatechange = (ev) => {

	// READ FILE IF EXIST
	fileReader = new TizenFileReader();
	fileReader.readFile('profiles.json', onSuccessRead);

}