const textArea = document.createElement('textarea');
const keyboard = document.createElement('div');
const infoAboutOs = document.createElement('div');

let capsLock = false;
let isEnglishLayout;
let layoutKeyboard;
let currentPosition;
textArea.readOnly = true;

if (localStorage) {
    isEnglishLayout = localStorage.value;
} else {
    isEnglishLayout = true;
}

keyboard.classList.add('keyboard');
textArea.classList.add('keyboard-input');
infoAboutOs.classList.add('information');


document.body.append(textArea);
document.body.append(keyboard);
document.body.append(infoAboutOs);

const engShiftKeyboardLayout = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', ':', '"', '<', '>', '?'];

const ruShiftKeyboardLayout = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '{', '}', ':', '"', '<', '>', '?'];

const defaultShiftKeyboardLayout = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', ';', '', ',', '.', '/'];

const engLayoutKeyboard = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', '↑',
    'Control', 'Win', 'Alt', 'Space', 'Alt', 'Control', '←', '↓', '→',
];

const ruLayoutKeyboard = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift', '↑',
    'Control', 'Win', 'Alt', 'Space', 'Alt', 'Control', '←', '↓', '→',
];

const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
];

function addIdToButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((key, index) => {
        key.setAttribute('id', keyCodes[index]);
    });
}

function changeLanguage() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((key, index) => {
        if (isEnglishLayout) {
            key.innerText = engLayoutKeyboard[index];
        } else {
            key.innerText = ruLayoutKeyboard[index];
        }
    });
}

function runOnKeys(func, ...codes) {
    const pressed = new Set();
    document.addEventListener('keydown', (event) => {
        pressed.add(event.key);
        // eslint-disable-next-line no-restricted-syntax
        for (const code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }
        isEnglishLayout = !isEnglishLayout;
        localStorage.value = isEnglishLayout;
        console.log(localStorage.value);
        pressed.clear();
        changeLanguage();
    });
    document.addEventListener('keyup', (event) => {
        pressed.delete(event.key);
    });
}

function init() {
    if (isEnglishLayout) {
        layoutKeyboard = engLayoutKeyboard;
    } else {
        layoutKeyboard = ruLayoutKeyboard;
    }
    layoutKeyboard.forEach((key) => {
        const createIconHTML = iconName => `<i class="material-icons">${iconName}</i>`;
        const keyElement = document.createElement('button');
        const insertLineBreak = ['Backspace', 'Del', 'Enter', '↑', 39].indexOf(key) !== -1;
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard__key');
        switch (key) {
            case 'ArrowLeft':
                keyElement.innerHTML = createIconHTML('keyboard_arrow_left');
                break;
            case 'ArrowUp':
                keyElement.innerHTML = createIconHTML('keyboard_arrow_up');
                break;
            case 'ArrowRight':
                keyElement.innerHTML = createIconHTML('keyboard_arrow_right');
                break;
            case 'ArrowDown':
                keyElement.innerHTML = createIconHTML('keyboard_arrow_down');
                break;
            case 'Control':
                keyElement.innerText = 'Ctrl';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'CapsLock':
                keyElement.innerText = 'CapsLock';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Shift':
                keyElement.innerText = 'Shift';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Win':
                keyElement.innerText = 'Win';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Del':
                keyElement.innerText = 'Del';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Alt':
                keyElement.innerText = 'Alt';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Backspace':
                keyElement.innerText = 'Backspace';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Tab':
                keyElement.innerText = 'Tab';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Enter':
                keyElement.innerHTML = createIconHTML('keyboard_return');
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Space':
                keyElement.classList.add('keyboard__key--extra--wide');
                keyElement.innerHTML = createIconHTML('space_bar');
                break;
            default:
                keyElement.innerText = key;
                break;
        }
        keyboard.appendChild(keyElement);
        if (insertLineBreak) {
            keyboard.appendChild(document.createElement('br'));
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

function isDelete() {
    const delText = [];
    currentPosition = textArea.selectionStart;
    textArea.value.split('').forEach((char, index) => {
        if (index !== currentPosition) {
            delText.push(char);
        }
    });
    textArea.value = delText.join('');
    textArea.selectionStart = currentPosition;
    textArea.selectionEnd = currentPosition;
}

function isArrowLeft() {
    currentPosition = textArea.selectionStart;
    textArea.selectionStart = currentPosition - 1;
    textArea.selectionEnd = currentPosition - 1;
}

function isArrowRight() {
    currentPosition = textArea.selectionStart;
    textArea.selectionStart = currentPosition + 1;
    textArea.selectionEnd = currentPosition + 1;
}

document.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.target.classList.add('keyboard__key_button');
        if (event.target.innerText === 'CapsLock') {
            isCapsLock();
        } else if (event.target.innerText === 'Del') {
            isDelete();
        } else if (event.target.innerText === 'space_bar' || event.target.firstChild.innerText === 'space_bar') {
            textArea.value += ' ';
        } else if (event.target.innerText === 'keyboard_return' || event.target.firstChild.innerText === 'keyboard_return') {
            textArea.value += '\n';
        } else if (event.target.innerText === 'backspace' || event.target.firstChild.innerText === 'backspace') {
            textArea.value = textArea.value.substring(0, textArea.value.length - 1);
        } else if (event.target.innerText === 'Tab') {
            event.preventDefault();
            textArea.value += '    ';
        } else if (event.target.innerText === 'keyboard_arrow_up' || event.target.firstChild.innerText === 'keyboard_arrow_up') {
            textArea.value += '↑';
        } else if (event.target.innerText === 'keyboard_arrow_down' || event.target.firstChild.innerText === 'keyboard_arrow_dowm') {
            textArea.value += '↓';
        } else if (event.target.innerText === 'keyboard_arrow_left' || event.target.firstChild.innerText === 'keyboard_arrow_left') {
            isArrowLeft();
        } else if (event.target.innerText === 'keyboard_arrow_right' || event.target.firstChild.innerText === 'keyboard_arrow_right') {
            isArrowRight();
        } else if (event.target.innerText === 'Shift'
            || event.target.innerText === 'Alt'
            || event.target.innerText === 'Ctrl') {
            event.preventDefault();
        } else {
            textArea.value += event.target.innerText;
        }
    }
});

document.onkeydown = (event) => {
    document.getElementById(event.code).classList.add('keyboard__key_button');
    if (event.key === 'CapsLock') {
        isCapsLock();
    } else if (event.code === 'Delete') {
        isDelete();
    } else if (event.key === 'Shift') {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((key, index) => {
            if (isEnglishLayout) {
                if (index < 13) {
                    key.innerText = engShiftKeyboardLayout[index];
                }
            } else if (index < 13) {
                key.innerText = ruShiftKeyboardLayout[index];
            }
        });
    } else if (event.code === 'Space') {
        textArea.value += ' ';
    } else if (event.code === 'Enter') {
        textArea.value += '\n';
    } else if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
        isEnglishLayout = !isEnglishLayout;
    } else if (event.code === 'Backspace') {
        textArea.value = textArea.value.substring(0, textArea.value.length - 1);
    } else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        event.preventDefault();
    } else if (event.code === 'Tab') {
        event.preventDefault();
        textArea.value += '    ';
    } else if (event.code === 'ArrowUp') {
        textArea.value += '↑';
    } else if (event.code === 'ArrowDown') {
        textArea.value += '↓';
    } else if (event.code === 'ArrowLeft') {
        isArrowLeft();
    } else if (event.code === 'ArrowRight') {
        isArrowRight();
    } else if (event.code === 'AltLeft' || event.code === 'AltRight') {
        event.preventDefault();
    } else {
        textArea.value += document.getElementById(event.code).innerText;
    }
};

document.addEventListener('mouseup', (event) => {
    setTimeout(() => {
        event.target.classList.remove('keyboard__key_button');
    }, 400);
});

document.onkeyup = (event) => {
    setTimeout(() => {
        document.getElementById(event.code).classList.remove('keyboard__key_button');
    }, 400);
    if (event.key === 'Shift') {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((key, index) => {
            if (index < 13) {
                key.innerText = defaultShiftKeyboardLayout[index];
            }
        });
    }
};
init();
addIdToButtons();
runOnKeys(changeLanguage(), 'Alt', 'Control');
