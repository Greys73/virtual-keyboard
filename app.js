// eslint-disable-next-line import/extensions
import { keyboard } from './assets/modules/variables.js';
// eslint-disable-next-line import/extensions
import loadJSON from './assets/modules/loader.js';
// eslint-disable-next-line import/extensions
import updateAll from './assets/modules/renderer.js';

let keys = null;

function pageLoaded() {
  loadJSON(keyboard).then((response) => {
    keys = response;
    updateAll(keys);
    console.log(keys);
  });
}
document.addEventListener('DOMContentLoaded', pageLoaded);
