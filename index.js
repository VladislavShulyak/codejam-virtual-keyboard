import layout from './src/js/constants/layoutConstants.js';
import keyboard from './src/js/constants/keyboardConstants.js';

let capsLock = false;
let isEnglishLayout;
let layoutKeyboard;
let currentPosition;
layout.TEXT_AREA.readOnly = true;

isEnglishLayout = localStorage ? localStorage.value : 'true';

layout.KEYBOARD.classList.add('keyboard');
layout.TEXT_AREA.classList.add('keyboard-input');
layout.INFO_ABOUT_US.classList.add('information');
layout.INFO_ABOUT_US.innerText = 'Смена языка CTRL + ALT. Выполнено в ОС WINDOWS';

document.body.append(layout.TEXT_AREA);
document.body.append(layout.KEYBOARD);
document.body.append(layout.INFO_ABOUT_US);

function addIdToButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((key, index) => {
        key.setAttribute('id', keyboard.KEY_CODES[index]);
    });
}

function changeLanguage() {
    const buttons = document.querySelectorAll('button');
    isEnglishLayout = 'false' ? 'true' : 'false';
    buttons.forEach((key, index) => {
        if (isEnglishLayout === 'true') {
            key.innerText = keyboard.languageKeyboard.ENG[index];
        } else {
            key.innerText = keyboard.languageKeyboard.RU[index];
        }
    });
}

function runOnKeys(...codes) {
    const pressed = new Set();
    document.addEventListener('keydown', (event) => {
        pressed.add(event.key);
        // eslint-disable-next-line no-restricted-syntax
        for (const code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }
        pressed.clear();
        changeLanguage();
    });
    document.addEventListener('keyup', (event) => {
        pressed.delete(event.key);
    });
}

function init() {
    layoutKeyboard = isEnglishLayout === 'true'
        ? keyboard.languageKeyboard.ENG
        : keyboard.languageKeyboard.RU;
    layoutKeyboard.forEach((key) => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ['Backspace', 'Del', 'Enter', '↑'].indexOf(key) !== -1;
        keyElement.setAttribute('type', 'button');
        keyElement.innerText = key;
        keyElement.classList.add('keyboard__key');
        if (keyboard.CONTROL_BUTTONS.includes(key)) {
            keyElement.classList.add(`keyboard__key${key === 'Space' ? '--extra' : ''}--wide`);
        }

        layout.KEYBOARD.appendChild(keyElement);
        if (insertLineBreak) {
            layout.KEYBOARD.appendChild(document.createElement('br'));
        }
    });
}

function isCapsLock() {
    capsLock = !capsLock;
    if (capsLock) {
        document.querySelectorAll('button').forEach((key) => {
            if (key.innerText.length === 1) {
                key.innerText = key.innerText.toUpperCase();
            }
        });
    } else {
        document.querySelectorAll('button').forEach((key) => {
            if (key.innerText.length === 1) {
                key.innerText = key.innerText.toLowerCase();
            }
        });
    }
}

function isShift() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((event, index) => {
        if (isEnglishLayout === 'true') {
            if (index < 13) {
                event.innerText = keyboard.shiftKeyboardLayout.ENG[index];
            }
        } else if (index < 13) {
            event.innerText = keyboard.shiftKeyboardLayout.RU[index];
        }
        if (event.innerText.length === 1) {
            event.innerText = event.innerText.toUpperCase();
        }
    });
}

function isDelete() {
    const delText = [];
    currentPosition = layout.TEXT_AREA.selectionStart;
    layout.TEXT_AREA.value.split('').forEach((char, index) => {
        if (index !== currentPosition) {
            delText.push(char);
        }
    });
    layout.TEXT_AREA.value = delText.join('');
    layout.TEXT_AREA.selectionStart = currentPosition;
    layout.TEXT_AREA.selectionEnd = currentPosition;
}

function isArrowLeft() {
    currentPosition = layout.TEXT_AREA.selectionStart;
    layout.TEXT_AREA.selectionStart = currentPosition - 1;
    layout.TEXT_AREA.selectionEnd = currentPosition - 1;
}

function isArrowRight() {
    currentPosition = layout.TEXT_AREA.selectionStart;
    layout.TEXT_AREA.selectionStart = currentPosition + 1;
    layout.TEXT_AREA.selectionEnd = currentPosition + 1;
}

function isShiftUp() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((key, index) => {
        if (index < 13) {
            key.innerText = keyboard.shiftKeyboardLayout.DEFAULT[index];
        }
        if (key.innerText.length === 1) {
            key.innerText = key.innerText.toLowerCase();
        }
    });
}

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
            isShift();
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
            isShift();
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
    localStorage.value = isEnglishLayout;
});

init();
addIdToButtons();
runOnKeys('Alt', 'Control');
