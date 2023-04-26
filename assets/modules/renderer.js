// eslint-disable-next-line import/extensions
import { SETTINGS } from './variables.js';
// eslint-disable-next-line import/extensions
import createObject from './obj-creator.js';

const curLang = SETTINGS.lang;
const shift = SETTINGS.shiftPressed;
const caps = SETTINGS.capsLock;

export default function updateAll(_keys) {
  const keys = _keys;
  keys.forEach((val, id) => {
    let type = 'def';
    if (!('DOMElement' in keys[id])) {
      createObject(val);
      document.getElementById('range3').appendChild(keys[id].DOMElement); // добавлятор по месту
    }
    if (keys[id].type === 'letter') {
      type = (shift !== caps) ? 'mod' : 'def';
    } else if (shift) {
      type = 'mod';
    } else {
      type = 'def';
    }
    keys[id].DOMElement.innerText = keys[id].langs[curLang][type];
  });
}
