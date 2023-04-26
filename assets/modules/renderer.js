/* eslint-disable import/extensions */
import { SETTINGS } from './variables.js';
import createObject from './obj-creator.js';

export default function updateKeys() {
  const { keys } = window;
  keys.forEach((val, id) => {
    let type = 'def';
    if (!('DOMElement' in keys[id])) {
      createObject(val);
    }
    if (keys[id].type === 'letter') { // TODO: регулярное выражение на определение буквенного символа
      type = (SETTINGS.shiftPressed !== SETTINGS.capsLock) ? 'mod' : 'def';
    } else if (SETTINGS.shiftPressed) {
      type = 'mod';
    } else {
      type = 'def';
    }
    keys[id].DOMElement.innerText = keys[id].langs[SETTINGS.lang][type];
  });
}
