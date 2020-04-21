import typeOfKey from './TypeOfKey.js';
import { isShiftUp } from './Buttons.js';
import keyboard from './constants/KeyboardConstants.js';

export default function listeners() {
    document.addEventListener('mousedown', (event) => {
        const { target } = event;
        if (target.tagName === 'BUTTON') {
            target.classList.add('keyboard__key_button');
            typeOfKey(target.innerText, event);
        }
    });

    document.addEventListener('mouseup', (event) => {
        const { target } = event;
        setTimeout(() => {
            target.classList.remove('keyboard__key_button');
        }, 400);
        if (target.innerText === 'Shift') {
            isShiftUp();
        }
    });

    document.onkeydown = (event) => {
        if (keyboard.KEY_CODES.includes(event.code.toString())) {
            document.getElementById(event.code).classList.add('keyboard__key_button');
            typeOfKey(event.code, event);
        }
    };

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
}
