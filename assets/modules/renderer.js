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
    if (/[a-zA-Zа-яА-ЯёЁ]/i.test(keys[id].langs[SETTINGS.lang][type])) { // exception for letters
      type = (SETTINGS.shiftPressed !== SETTINGS.capsLock) ? 'mod' : 'def';
    } else if (SETTINGS.shiftPressed) {
      type = 'mod';
    } else {
      type = 'def';
    }
    keys[id].DOMElement.innerText = keys[id].langs[SETTINGS.lang][type];
  });
}
