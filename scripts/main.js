function onSuccess(files) {
    for (var i = 0; i < files.length; i++) {
        console.log('File path and name is: ' + files[i]);
    }
}

function onError(error) {
    console.log(error);
}

document.onreadystatechange = (ev) => {

    if (!tizen.filesystem.pathExists("documents/profile.json")) {
        tizen.filesystem.createFile("profile.json");
    }

    tizen.filesystem.listDirectory('documents/', onSuccess, onError);
}