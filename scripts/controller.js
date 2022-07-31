window.TvKeyCode =
{
		"KEY_1" : 49,
		"KEY_2" : 50,
		"KEY_3" : 51,
		"KEY_4" : 52,
		"KEY_5" : 53,
		"KEY_6" : 54,
		"KEY_7" : 55,
		"KEY_8" : 56,
		"KEY_9" : 57,
		"KEY_0" : 48,
		"KEY_MINUS" : 189,
		"KEY_VOLUMEUP" : 447,
		"KEY_VOLUMEDOWN" : 448,
		"KEY_MUTE" : 449,
		"KEY_CHANNELUP" : 427,
		"KEY_CHANNELDOWN" : 428,
		"KEY_PREVIOUS" : 412,
		"KEY_NEXT" : 417,
		"KEY_PAUSE" : 19,
		"KEY_RECORD" : 416,
		"KEY_PLAY" : 415,
		"KEY_STOP" : 413,
		
		"KEY_INFO" : 457,
		"KEY_LEFT" : 37,
		"KEY_RIGHT" : 39,
		"KEY_UP" : 38,
		"KEY_DOWN" : 40,
		"KEY_ENTER" : 13,
		"KEY_BACK" : 0,
		
		"KEY_RED" : 403,
		"KEY_GREEN" : 404,
		"KEY_YELLOW" : 405,
		"KEY_BLUE" : 406,
		"KEY_MENU" : 18
				
}

var cursorPosition = 0;
var cursorElements = []

function setFocusElement(e) {

	switch (e.keyCode) {
		case TvKeyCode.KEY_ENTER:
			console.log(cursorElements[cursorPosition]);
//			window.location.href = $("#id"+mainfocus).attr("href");
            break;
        case TvKeyCode.KEY_UP:
        	cursorPosition -= 1;
			break;
        case TvKeyCode.KEY_LEFT:
        	cursorPosition -= 1;
	        break;
        case TvKeyCode.KEY_DOWN:
        	cursorPosition += 1;
			break;
		case TvKeyCode.KEY_RIGHT:
			cursorPosition += 1;
            break;
    }
	
	if (cursorPosition < 0) {
		cursorPosition = 0;
	}
	
	if (cursorPosition >= cursorElements.length) {
		cursorPosition = cursorElements.length - 1;
	}
	
	cursorElements[cursorPosition].focus()
}

$(document).ready(function(){
	document.addEventListener('keydown', setFocusElement);
	
	cursorElements = $('*[data-role="ui-option"]');
	if (cursorElements.length > 0) {
		cursorElements[0].focus()
	}
});
