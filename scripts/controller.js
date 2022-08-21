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
		"KEY_BACK" : 10009,
		
		"KEY_RED" : 403,
		"KEY_GREEN" : 404,
		"KEY_YELLOW" : 405,
		"KEY_BLUE" : 406,
		"KEY_MENU" : 18
				
}

var focusElement;
var cursorElements = []
var modalOpened;


function setFocusElement(e) {
	
	console.log(e.keyCode);
	
	let nextElement = null;
	let candidates = [];
	let size = 0;
	
	if (focusElement == null && cursorElements.length > 0) {
		cursorElements[0].classList.add("focus");
		focusElement = cursorElements[0];
	}

	switch (e.keyCode) {
		case TvKeyCode.KEY_ENTER:
			e.preventDefault();
			if (focusElement instanceof HTMLInputElement) {
				focusElement.focus();
			}
//			if (focusElement instanceof HTMLSelectElement) {
//				let se = $(focusElement);
//				se.show();
//				se[0].size=2;
//			}
			if (focusElement.onclick != null) {
				focusElement.click();
			}
            return;
        case TvKeyCode.KEY_UP:
        	e.preventDefault();
        	cadidates = cursorElements.filter((el) => el.getBoundingClientRect().top < focusElement.getBoundingClientRect().top);
        	if (cadidates.length > 0) {
        		candidates = cadidates.sort((a, b) => {
        			const xADistance = Math.abs(focusElement.getBoundingClientRect().top - a.getBoundingClientRect().top);
        			const yADistance = Math.abs(focusElement.getBoundingClientRect().left - a.getBoundingClientRect().left);
        			const xBDistance = Math.abs(focusElement.getBoundingClientRect().top - b.getBoundingClientRect().top);
        			const yBDistance = Math.abs(focusElement.getBoundingClientRect().left - b.getBoundingClientRect().left);
        			
        			if (yADistance > yBDistance) {
        				return 1;
        			} else if (yBDistance > yADistance) {
        				return -1;
        			} else {
        				const aEuclidianDistance = Math.sqrt(Math.pow(xADistance, 2) + Math.pow(yADistance, 2));
        				const bEuclidianDistance = Math.sqrt(Math.pow(xBDistance, 2) + Math.pow(yBDistance, 2));
        				
        				if (aEuclidianDistance > bEuclidianDistance) {
        					return 1;
        				} else if (bEuclidianDistance > aEuclidianDistance) {
        					return -1;
        				} else {
        					return 0;
        				}
        			}
        		});
        		nextElement = candidates[0]
        	}
			break;
        case TvKeyCode.KEY_LEFT:
        	e.preventDefault();
        	cadidates = cursorElements.filter((el) => el.getBoundingClientRect().left < focusElement.getBoundingClientRect().left);
        	if (cadidates.length > 0) {
        		candidates = cadidates.sort((a, b) => {
        			const xADistance = Math.abs(focusElement.getBoundingClientRect().top - a.getBoundingClientRect().top);
        			const yADistance = Math.abs(focusElement.getBoundingClientRect().left - a.getBoundingClientRect().left);
        			const xBDistance = Math.abs(focusElement.getBoundingClientRect().top - b.getBoundingClientRect().top);
        			const yBDistance = Math.abs(focusElement.getBoundingClientRect().left - b.getBoundingClientRect().left);
        			
        			if (xADistance > xBDistance) {
        				return 1;
        			} else if (xBDistance > xADistance) {
        				return -1;
        			} else {
        				const aEuclidianDistance = Math.sqrt(Math.pow(xADistance, 2) + Math.pow(yADistance, 2));
        				const bEuclidianDistance = Math.sqrt(Math.pow(xBDistance, 2) + Math.pow(yBDistance, 2));
        				
        				if (aEuclidianDistance > bEuclidianDistance) {
        					return 1;
        				} else if (bEuclidianDistance > aEuclidianDistance) {
        					return -1;
        				} else {
        					return 0;
        				}
        			}
        		});
        		nextElement = candidates[0]
        	}
			break;
        case TvKeyCode.KEY_DOWN:
        	e.preventDefault();
        	console.log("DOWN");
        	cadidates = cursorElements.filter((el) => el.getBoundingClientRect().top > focusElement.getBoundingClientRect().top);
        	console.log(cadidates.length)
        	if (cadidates.length > 0) {
        		candidates = cadidates.sort((a, b) => {
        			const xADistance = Math.abs(focusElement.getBoundingClientRect().top - a.getBoundingClientRect().top);
        			const yADistance = Math.abs(focusElement.getBoundingClientRect().left - a.getBoundingClientRect().left);
        			const xBDistance = Math.abs(focusElement.getBoundingClientRect().top - b.getBoundingClientRect().top);
        			const yBDistance = Math.abs(focusElement.getBoundingClientRect().left - b.getBoundingClientRect().left);
        			
        			if (yADistance > yBDistance) {
        				return 1;
        			} else if (yBDistance > yADistance) {
        				return -1;
        			} else {
        				const aEuclidianDistance = Math.sqrt(Math.pow(xADistance, 2) + Math.pow(yADistance, 2));
        				const bEuclidianDistance = Math.sqrt(Math.pow(xBDistance, 2) + Math.pow(yBDistance, 2));
        				
        				if (aEuclidianDistance > bEuclidianDistance) {
        					return 1;
        				} else if (bEuclidianDistance > aEuclidianDistance) {
        					return -1;
        				} else {
        					return 0;
        				}
        			}
        		});
        		nextElement = candidates[0]
        	}
			break;
		case TvKeyCode.KEY_RIGHT:
			e.preventDefault();
			cadidates = cursorElements.filter((el) => el.getBoundingClientRect().left > focusElement.getBoundingClientRect().left);
        	if (cadidates.length > 0) {
        		candidates = cadidates.sort((a, b) => {
        			const xADistance = Math.abs(focusElement.getBoundingClientRect().top - a.getBoundingClientRect().top);
        			const yADistance = Math.abs(focusElement.getBoundingClientRect().left - a.getBoundingClientRect().left);
        			const xBDistance = Math.abs(focusElement.getBoundingClientRect().top - b.getBoundingClientRect().top);
        			const yBDistance = Math.abs(focusElement.getBoundingClientRect().left - b.getBoundingClientRect().left);
        			
        			if (xADistance > xBDistance) {
        				return 1;
        			} else if (xBDistance > xADistance) {
        				return -1;
        			} else {
        				const aEuclidianDistance = Math.sqrt(Math.pow(xADistance, 2) + Math.pow(yADistance, 2));
        				const bEuclidianDistance = Math.sqrt(Math.pow(xBDistance, 2) + Math.pow(yBDistance, 2));
        				
        				if (aEuclidianDistance > bEuclidianDistance) {
        					return 1;
        				} else if (bEuclidianDistance > aEuclidianDistance) {
        					return -1;
        				} else {
        					return 0;
        				}
        			}
        		});
        		nextElement = candidates[0]
        	}
			break;
		case TvKeyCode.KEY_BACK:
			if (modalOpened) {
				modalOpened.style.display = 'none';;
				modalOpened = null;
			}
			break;
			
    }
	
	if (nextElement == null) {
		return
	}
	
	focusElement.classList.remove("focus");
	focusElement.blur();
	focusElement = nextElement
	focusElement.classList.add("focus");
	focusElement.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
}

function loadUIComponents() {
	cursorElements = $('*[data-role="ui-option"]').get();
	console.log(cursorElements);
	let aux = $('*[data-role="ui-shadow"]');
	aux.each((index) => {
		let elements = $(aux[index].shadowRoot).find('*[data-role="ui-option"]').get();
		cursorElements = cursorElements.concat(elements)
	})
	
	if (focusElement == null) {
		cursorElements.forEach((el) => {
			if (el.hasAttribute('firstFocus')) {
				focusElement = el;
			}
		});
		
		if (focusElement != null) {
			focusElement.classList.add("focus");
			window.scrollTo({ top: focusElement.offsetTop-300, behavior: 'smooth'});
		}
	}
}

$(document).ready(function(){
	document.addEventListener('keydown', setFocusElement);
	loadUIComponents();
});
