import {
 isArrowLeft, isArrowRight, isCapsLock, isDelete, isShift,
} from './Buttons.js';
import keyboard from './constants/KeyboardConstants.js';
import layout from './constants/LayoutConstants.js';

export default function typeOfKey(listener, event) {
    if (listener === 'CapsLock') {
        isCapsLock();
    } else if (listener === 'Delete') {
        isDelete();
    } else if (listener === 'Shift' || event.key === 'Shift') {
        isShift(keyboard.isEnglishLayout);
    } else if (listener === 'Space') {
        layout.TEXT_AREA.value += ' ';
    } else if (listener === 'Enter') {
        layout.TEXT_AREA.value += '\n';
    } else if (listener === 'Backspace') {
        layout.TEXT_AREA.value = layout.TEXT_AREA.value
            .substring(0, layout.TEXT_AREA.value.length - 1);
    } else if (listener === 'ArrowUp') {
        layout.TEXT_AREA.value += '↑';
    } else if (listener === 'ArrowDown') {
        layout.TEXT_AREA.value += '↓';
    } else if (listener === 'ArrowLeft') {
        isArrowLeft();
    } else if (listener === 'ArrowRight') {
        isArrowRight();
    } else if (listener === 'Tab') {
        event.preventDefault();
        layout.TEXT_AREA.value += '    ';
    } else if (event.type === 'mousedown' && (listener === 'Alt'
        || listener === 'Control'
        || listener === 'Win')) {
        event.preventDefault();
    } else if (event.type === 'keydown' && (event.key === 'Control'
        || event.key === 'Meta'
        || event.key === 'Alt')) {
        event.preventDefault();
    } else if (event.type === 'mousedown') {
        layout.TEXT_AREA.value += listener;
    } else if (event.type === 'keydown') {
        layout.TEXT_AREA.value += document.getElementById(event.code).innerText;
    }
}
