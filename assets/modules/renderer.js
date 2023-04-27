/* eslint-disable import/extensions */
import createObject from './obj-creator.js';
import { calcSymbol } from './typing.js';

export function updateKeys() {
  const { keys } = window;
  keys.forEach((val, id) => {
    if (!('DOMElement' in keys[id])) {
      createObject(val);
    }
    keys[id].DOMElement.innerText = calcSymbol(keys[id]);
  });
}

export function createHTML() {
  document.body.innerHTML = `
  <main class="wrapper">
    <section>
      <textarea name="textArea" class="text-area" cols="80" rows="10" autofocus unselectable="on"></textarea>
    </section>
    <section>
      <div class="keyboard">
        <section class="range" id="range1"></section>
        <section class="range" id="range2"></section>
        <section class="range" id="range3"></section>
        <section class="range" id="range4"></section>
        <section class="range" id="range5"></section>
      </div>
    </section>
  </main>
  `;
}
