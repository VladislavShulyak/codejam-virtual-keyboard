import layout from './src/js/constants/layoutConstants.js';
import keyboard from './src/js/constants/keyboardConstants.js';
import { createDomElements, init, addIdToButtons } from './src/js/elements.js';
import { runOnKeys } from "./src/js/changeLanguage.js";
import {
    isArrowLeft,
    isArrowRight,
    isDelete,
    isShift,
    isShiftUp,
    isCapsLock,
} from './src/js/buttons.js';

layout.TEXT_AREA.readOnly = true;

keyboard.isEnglishLayout = localStorage ? localStorage.value : 'true';
runOnKeys('Alt', 'Control');
createDomElements();
init(keyboard.isEnglishLayout);
addIdToButtons();

document.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.target.classList.add('keyboard__key_button');
        if (event.target.innerText === 'CapsLock') {
            isCapsLock();
        } else if (event.target.innerText === 'Del') {
            isDelete();
        } else if (event.target.innerText === 'Space') {
            layout.TEXT_AREA.value += ' ';
        } else if (event.target.innerText === 'Enter') {
            layout.TEXT_AREA.value += '\n';
        } else if (event.target.innerText === 'Backspace') {
            layout.TEXT_AREA.value = layout.TEXT_AREA.value
                .substring(0, layout.TEXT_AREA.value.length - 1);
        } else if (event.target.innerText === 'Tab') {
            event.preventDefault();
            layout.TEXT_AREA.value += '    ';
        } else if (event.target.innerText === '↑') {
            layout.TEXT_AREA.value += '↑';
        } else if (event.target.innerText === '↓') {
            layout.TEXT_AREA.value += '↓';
        } else if (event.target.innerText === '←') {
            isArrowLeft();
        } else if (event.target.innerText === '→') {
            isArrowRight();
        } else if (event.target.innerText === 'Shift') {
            isShift(keyboard.isEnglishLayout);
        } else if (event.target.innerText === 'Alt'
            || event.target.innerText === 'Control'
            || event.target.innerText === 'Win') {
            event.preventDefault();
        } else {
            layout.TEXT_AREA.value += event.target.innerText;
        }
    }
});

document.onkeydown = (event) => {
    if (keyboard.KEY_CODES.includes(event.code.toString())) {
        document.getElementById(event.code).classList.add('keyboard__key_button');
        if (event.key === 'CapsLock') {
            isCapsLock();
        } else if (event.code === 'Delete') {
            isDelete();
        } else if (event.key === 'Shift') {
            isShift(keyboard.isEnglishLayout);
        } else if (event.code === 'Space') {
            layout.TEXT_AREA.value += ' ';
        } else if (event.code === 'Enter') {
            layout.TEXT_AREA.value += '\n';
        } else if (event.code === 'Backspace') {
            layout.TEXT_AREA.value = layout.TEXT_AREA.value
                .substring(0, layout.TEXT_AREA.value.length - 1);
        } else if (event.key === 'Control'
            || event.key === 'Meta'
            || event.key === 'Alt') {
            event.preventDefault();
        } else if (event.code === 'Tab') {
            event.preventDefault();
            layout.TEXT_AREA.value += '    ';
        } else if (event.code === 'ArrowUp') {
            layout.TEXT_AREA.value += '↑';
        } else if (event.code === 'ArrowDown') {
            layout.TEXT_AREA.value += '↓';
        } else if (event.code === 'ArrowLeft') {
            isArrowLeft();
        } else if (event.code === 'ArrowRight') {
            isArrowRight();
        } else {
            layout.TEXT_AREA.value += document.getElementById(event.code).innerText;
        }
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
