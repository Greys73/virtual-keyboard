/* eslint-disable import/extensions */
import { SETTINGS } from './variables.js';
import updateKeys from './renderer.js';

export default function keyEvent(e) {
  const keyCode = e.code;
  const eventType = e.type === 'keydown';
  console.log(e);
  if (e.repeat) return;
  switch (keyCode) {
    case 'ShiftLeft':
    case 'ShiftRight':
      SETTINGS.shiftPressed = eventType;
      break;
    case 'CapsLock':
      if (eventType) {
        SETTINGS.capsLock = !SETTINGS.capsLock;
      }
      break;
    default: break;
  }
  const obj = window.keys.find((elem) => elem.code === keyCode);
  if (obj) {
    const clickEvent = new Event((eventType) ? 'mousedown' : 'mouseup');
    obj.DOMElement.dispatchEvent(clickEvent);
  }
  updateKeys();
}
