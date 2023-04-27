/* eslint-disable import/extensions */
import { keyboardJSON } from './assets/modules/variables.js';
import loadJSON from './assets/modules/loader.js';
import { updateKeys, createHTML } from './assets/modules/renderer.js';
import keyEvent from './assets/modules/key-events.js';

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

function pageLoaded() {
  createHTML();
  tuneTextarea();
  loadJSON(keyboardJSON).then((response) => {
    window.keys = response;
    updateKeys();
  });
}

document.addEventListener('DOMContentLoaded', pageLoaded);
window.addEventListener('keydown', keyEvent, true);
window.addEventListener('keyup', keyEvent, true);
