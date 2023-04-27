/* eslint-disable import/extensions */
import { SETTINGS } from './variables.js';

export function calcSymbol(obj) {
  let type = 'def';
  if (/[a-zA-Zа-яА-ЯёЁ]/i.test(obj.langs[SETTINGS.lang][type])) { // exception for letters
    type = (SETTINGS.shiftPressed !== SETTINGS.capsLock) ? 'mod' : 'def';
  } else if (SETTINGS.shiftPressed) {
    type = 'mod';
  } else {
    type = 'def';
  }
  return obj.langs[SETTINGS.lang][type];
}

export function typeSymbol(val) {
  const text = document.getElementsByClassName('text-area')[0];
  const start = text.selectionStart;
  const end = text.selectionEnd;
  text.value = `${text.value.substring(0, start)}${val}${text.value.substring(end, text.value.length)}`;
  text.selectionStart = start + 1;
}

export function execCommand(cmd, event) {
  const text = document.getElementsByClassName('text-area')[0];
  const start = text.selectionStart;
  const end = text.selectionEnd;
  switch (cmd) {
    case 'Enter':
      if (event === 'mousedown') {
        text.value = `${text.value.substring(0, start)}\n${text.value.substring(end, text.value.length)}`;
        text.selectionStart = start + 1;
      }
      break;
    case 'CapsLock':
      if (event === 'mousedown') {
        SETTINGS.capsLock = !SETTINGS.capsLock;
      }
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      SETTINGS.shiftPressed = event === 'mousedown';
      break;
    default: break;
  }
  window.keys.forEach((val, id) => {
    window.keys[id].DOMElement.innerText = calcSymbol(val);
  });
}
