var dir = tizen.filesystem;

function onSuccess(files) {
    for (var i = 0; i < files.length; i++) {
        /* Display the file path with name */
        console.log('File path and name is: ' + files[i]);
    }
}

function onError(error) {
    console.log(error);
}

$( document ).ready(function() {
    console.log( "ready!" );
    tizen.filesystem.listDirectory('data', onSuccess, onError);
});