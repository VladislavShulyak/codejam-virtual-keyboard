import layout from './constants/LayoutConstants.js';
import keyboard from './constants/KeyboardConstants.js';

let currentPosition;
let capsLock = false;

function changeKeyState(state) {
    document.querySelectorAll('button').forEach((key) => {
        if (key.innerText.length === 1) {
            key.innerText = key.innerText[`to${state}Case`]();
        }
    });
}

function changeCursorPosition(newPosition) {
    currentPosition = layout.TEXT_AREA.selectionStart;
    layout.TEXT_AREA.selectionStart = newPosition;
    layout.TEXT_AREA.selectionEnd = newPosition;
}

export function isArrowLeft() {
    changeCursorPosition(currentPosition - 1);
}

export function isArrowRight() {
    changeCursorPosition(currentPosition + 1);
}

export function isDelete() {
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

export function isShiftUp() {
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

export function isShift(isEnglishLayout) {
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

export function isCapsLock() {
    capsLock = !capsLock;
    changeKeyState(capsLock ? 'Upper' : 'Lower');
}
