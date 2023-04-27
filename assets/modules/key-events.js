/* eslint-disable import/extensions */
import { updateKeys } from './renderer.js';

export default function keyEvent(e) {
  const keyCode = e.code;
  const eventType = e.type === 'keydown';
  if (e.repeat) return;
  const obj = window.keys.find((elem) => elem.code === keyCode);
  if (obj) {
    const clickEvent = new Event((eventType) ? 'mousedown' : 'mouseup');
    obj.DOMElement.dispatchEvent(clickEvent);
  }
  updateKeys();
}
