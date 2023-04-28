/* eslint-disable import/extensions */
import { loadFromStorage, saveToStorage, loadJSON } from './assets/modules/utils.js';
import { keyboardJSON } from './assets/modules/variables.js';
import { updateKeys, createHTML } from './assets/modules/renderer.js';

window.keys = null;

function tuneTextarea() {
  const obj = document.getElementsByClassName('text-area');
  obj[0].addEventListener('blur', () => {
    obj[0].focus();
  });
  obj[0].addEventListener('keydown', (e) => {
    e.preventDefault();
  });
  obj[0].addEventListener('select', () => {
    obj[0].selectionEnd = obj[0].selectionStart;
  });
}

function keyEvent(e) {
  const eventType = e.type === 'keydown';
  if (!window.keys) {
    return false;
  }
  const obj = window.keys.find((elem) => elem.code === e.code);
  if (obj) {
    const clickEvent = new Event((eventType) ? 'mousedown' : 'mouseup');
    clickEvent.repeat = e.repeat;
    obj.DOMElement.dispatchEvent(clickEvent);
  }
  return false;
}

function pageLoaded() {
  createHTML();
  loadFromStorage();
  tuneTextarea();
  loadJSON(keyboardJSON).then((response) => {
    window.keys = response;
    updateKeys();
  });
  window.addEventListener('keydown', keyEvent);
  window.addEventListener('keyup', keyEvent);
}

function pageUnload() {
  saveToStorage();
}

document.addEventListener('DOMContentLoaded', pageLoaded);
window.addEventListener('unload', pageUnload);
