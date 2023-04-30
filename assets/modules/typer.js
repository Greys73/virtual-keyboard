import {
  calcSymbol,
  changeLang,
  changeTextLine,
  lineBreaker,
} from './utils.js';
import { SETTINGS } from './variables.js';

export function typeSymbol(val) {
  const text = document.getElementsByClassName('text-area')[0];
  const start = text.selectionStart;
  text.value = `${text.value.substring(0, start)}${val}${text.value.substring(start, text.value.length)}`;
  text.selectionStart = start + 1;
  text.value = lineBreaker(text.value);
}

export function execCommand(cmd, event) {
  const text = document.getElementsByClassName('text-area')[0];
  const start = text.selectionStart;
  if (event.type === 'mousedown') {
    switch (cmd) {
      case 'ArrowUp':
        text.selectionStart = changeTextLine(text, -1);
        break;
      case 'ArrowDown':
        text.selectionStart = changeTextLine(text, 1);
        break;
      case 'ArrowLeft':
        text.selectionStart = start - 1;
        break;
      case 'ArrowRight':
        text.selectionStart = start + 1;
        break;
      case 'Tab':
        text.value = `${text.value.substring(0, start)}  ${text.value.substring(start, text.value.length)}`;
        text.selectionStart = start + 2;
        break;
      case 'Enter':
        text.value = `${text.value.substring(0, start)}\n${text.value.substring(start, text.value.length)}`;
        text.selectionStart = start + 1;
        break;
      case 'Delete':
        text.value = `${text.value.substring(0, start)}${text.value.substring(start + 1, text.value.length)}`;
        text.selectionStart = start;
        break;
      case 'Backspace':
        text.value = `${text.value.substring(0, start - 1)}${text.value.substring(start, text.value.length)}`;
        text.selectionStart = (start > 0) ? start - 1 : 0;
        break;
      case 'CapsLock':
        if (!event.repeat) {
          SETTINGS.capsLock = !SETTINGS.capsLock;
        }
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        SETTINGS.shiftPressed = true;
        break;
      case 'AltLeft':
      case 'AltRight':
        SETTINGS.altPressed = true;
        break;
      default: break;
    }
  } else {
    switch (cmd) {
      case 'ShiftLeft':
      case 'ShiftRight':
        SETTINGS.shiftPressed = false;
        break;
      case 'AltLeft':
      case 'AltRight':
        SETTINGS.altPressed = false;
        break;
      default: break;
    }
  }
  text.value = lineBreaker(text.value);
  if (SETTINGS.altPressed && SETTINGS.shiftPressed && !event.repeat) {
    changeLang();
  }
  window.keys.forEach((val, id) => {
    window.keys[id].DOMElement.innerText = calcSymbol(val);
  });
}
