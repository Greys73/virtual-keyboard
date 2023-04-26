/* eslint-disable import/extensions */
import { keyboardJSON } from './assets/modules/variables.js';
import loadJSON from './assets/modules/loader.js';
import updateKeys from './assets/modules/renderer.js';
import keyEvent from './assets/modules/key-events.js';

window.keys = null;

function pageLoaded() {
  loadJSON(keyboardJSON).then((response) => {
    window.keys = response;
    updateKeys();
    console.log(window.keys);
  });
}

document.addEventListener('DOMContentLoaded', pageLoaded);
window.addEventListener('keydown', keyEvent, true);
window.addEventListener('keyup', keyEvent, true);
