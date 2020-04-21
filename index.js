import layout from './src/js/constants/LayoutConstants.js';
import keyboard from './src/js/constants/KeyboardConstants.js';
import { createDomElements, init, addIdToButtons } from './src/js/Elements.js';
import { runOnKeys } from "./src/js/ChangeLanguage.js";
import listeners from "./src/js/Events.js";

createDomElements();
init(keyboard.isEnglishLayout);
addIdToButtons();
listeners();
runOnKeys('Alt', 'Control');