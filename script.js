const keyboard = document.createElement('div');
const infoAboutUs = document.createElement('div');
const textArea = document.createElement('textarea');

let capsLock = false;
let isEnglishLayout;
let layoutKeyboard;
let currentPosition;
textArea.readOnly = true;

if (localStorage) {
    isEnglishLayout = localStorage.value;
} else {
    isEnglishLayout = 'true';
}

keyboard.classList.add('keyboard');
textArea.classList.add('keyboard-input');
infoAboutUs.classList.add('information');
infoAboutUs.innerText = 'Смена языка CTRL + ALT. Выполнено в ОС WINDOWS';

document.body.append(textArea);
document.body.append(keyboard);
document.body.append(infoAboutUs);

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
    if (isEnglishLayout === 'false') {
        isEnglishLayout = 'true';
    } else {
        isEnglishLayout = 'false';
    }

    buttons.forEach((key, index) => {
        if (isEnglishLayout === 'true') {
            key.innerText = engLayoutKeyboard[index];
        } else {
            key.innerText = ruLayoutKeyboard[index];
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
    if (isEnglishLayout === 'true') {
        layoutKeyboard = engLayoutKeyboard;
    } else {
        layoutKeyboard = ruLayoutKeyboard;
    }
    layoutKeyboard.forEach((key) => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ['Backspace', 'Del', 'Enter', '↑'].indexOf(key) !== -1;
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard__key');
        switch (key) {
            case 'Control':
                keyElement.innerText = 'Control';
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
                keyElement.innerText = 'Enter';
                keyElement.classList.add('keyboard__key--wide');
                break;
            case 'Space':
                keyElement.innerText = 'Space';
                keyElement.classList.add('keyboard__key--extra--wide');
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

function isShift() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((event, index) => {
        if (isEnglishLayout === 'true') {
            if (index < 13) {
                event.innerText = engShiftKeyboardLayout[index];
            }
        } else if (index < 13) {
            event.innerText = ruShiftKeyboardLayout[index];
        }
        if (event.innerText.length === 1) {
            event.innerText = event.innerText.toUpperCase();
        }
    });
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

function isShiftUp() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((key, index) => {
        if (index < 13) {
            key.innerText = defaultShiftKeyboardLayout[index];
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
            textArea.value += ' ';
        } else if (event.target.innerText === 'Enter') {
            textArea.value += '\n';
        } else if (event.target.innerText === 'Backspace') {
            textArea.value = textArea.value.substring(0, textArea.value.length - 1);
        } else if (event.target.innerText === 'Tab') {
            event.preventDefault();
            textArea.value += '    ';
        } else if (event.target.innerText === '↑') {
            textArea.value += '↑';
        } else if (event.target.innerText === '↓') {
            textArea.value += '↓';
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
            textArea.value += event.target.innerText;
        }
    }
});

document.onkeydown = (event) => {
    if (keyCodes.includes(event.code.toString())) {
        document.getElementById(event.code).classList.add('keyboard__key_button');
        if (event.key === 'CapsLock') {
            isCapsLock();
        } else if (event.code === 'Delete') {
            isDelete();
        } else if (event.key === 'Shift') {
            isShift();
        } else if (event.code === 'Space') {
            textArea.value += ' ';
        } else if (event.code === 'Enter') {
            textArea.value += '\n';
        } else if (event.code === 'Backspace') {
            textArea.value = textArea.value.substring(0, textArea.value.length - 1);
        } else if (event.key === 'Control'
                || event.key === 'Meta'
                || event.key === 'Alt') {
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
        } else {
            textArea.value += document.getElementById(event.code).innerText;
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
    if (keyCodes.includes(event.code.toString())) {
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
