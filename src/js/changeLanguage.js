import keyboard from './constants/keyboardConstants.js';

export function changeLanguage() {
    const buttons = document.querySelectorAll('button');
    keyboard.isEnglishLayout = keyboard.isEnglishLayout === 'true' ? 'false' : 'true';
    buttons.forEach((key, index) => {
        if (keyboard.isEnglishLayout === 'true') {
            key.innerText = keyboard.languageKeyboard.ENG[index];
        } else {
            key.innerText = keyboard.languageKeyboard.RU[index];
        }
    });
}

export function runOnKeys(...codes) {
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
