import layout from './constants/LayoutConstants.js';
import keyboard from './constants/KeyboardConstants.js';

let layoutKeyboard;

export function createDomElements() {
    keyboard.isEnglishLayout = localStorage ? localStorage.value : 'true';

    layout.KEYBOARD.classList.add('keyboard');
    layout.TEXT_AREA.classList.add('keyboard-input');
    layout.INFO_ABOUT_US.classList.add('information');
    layout.INFO_ABOUT_US.innerText = 'Смена языка CTRL + ALT. Выполнено в ОС WINDOWS';

    document.body.append(layout.TEXT_AREA);
    document.body.append(layout.KEYBOARD);
    document.body.append(layout.INFO_ABOUT_US);
}

 export function init(isEnglishLayout) {
     layout.TEXT_AREA.readOnly = true;
     layoutKeyboard = isEnglishLayout === 'true'
         ? keyboard.languageKeyboard.ENG
         : keyboard.languageKeyboard.RU;
     layoutKeyboard.forEach((key) => {
         const keyElement = document.createElement('button');
         const insertLineBreak = keyboard.LINE_BREAK.indexOf(key) !== -1;
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

 export function addIdToButtons() {
     const buttons = document.querySelectorAll('button');
     buttons.forEach((key, index) => {
         key.setAttribute('id', keyboard.KEY_CODES[index]);
     });
 }
