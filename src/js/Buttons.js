import layout from './constants/LayoutConstants.js';
import keyboard from "./constants/KeyboardConstants.js";

let currentPosition;
let capsLock = false;

export function isArrowLeft() {
    currentPosition = layout.TEXT_AREA.selectionStart;
    layout.TEXT_AREA.selectionStart = currentPosition - 1;
    layout.TEXT_AREA.selectionEnd = currentPosition - 1;
}

export function isArrowRight() {
    currentPosition = layout.TEXT_AREA.selectionStart;
    layout.TEXT_AREA.selectionStart = currentPosition + 1;
    layout.TEXT_AREA.selectionEnd = currentPosition + 1;
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
