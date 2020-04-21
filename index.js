import layout from './src/js/constants/LayoutConstants.js';
import keyboard from './src/js/constants/KeyboardConstants.js';
import typeOfKey from "./src/js/TypeOfKey.js";
import { createDomElements, init, addIdToButtons } from './src/js/Elements.js';
import { runOnKeys } from "./src/js/ChangeLanguage.js";
import { isShiftUp } from './src/js/Buttons.js';

layout.TEXT_AREA.readOnly = true;

keyboard.isEnglishLayout = localStorage ? localStorage.value : 'true';
runOnKeys('Alt', 'Control');
createDomElements();
init(keyboard.isEnglishLayout);
addIdToButtons();

document.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.target.classList.add('keyboard__key_button');
        typeOfKey(event.target.innerText, event);
    }
});

document.onkeydown = (event) => {
    if (keyboard.KEY_CODES.includes(event.code.toString())) {
        document.getElementById(event.code).classList.add('keyboard__key_button');
        typeOfKey(event.code, event);
    }
};

document.addEventListener('mouseup', (event) => {
    setTimeout(() => {
        event.target.classList.remove('keyboard__key_button');
    }, 400);
    if (event.target.innerText === 'Shift') {
        isShiftUp();
    }
});

document.onkeyup = (event) => {
    if (keyboard.KEY_CODES.includes(event.code.toString())) {
        setTimeout(() => {
            document.getElementById(event.code).classList.remove('keyboard__key_button');
        }, 400);
        if (event.key === 'Shift') {
            isShiftUp();
        }
    }
};

window.addEventListener('beforeunload', () => {
    localStorage.value = keyboard.isEnglishLayout;
});
