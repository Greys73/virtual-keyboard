/* eslint-disable import/extensions */
import { calcSymbol } from './utils.js';
import createObject from './obj-creator.js';

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
  <header class="header">
    <h1>RSS Virtual Keyboard</h1>
  </header>
  <main class="wrapper">

    <section>
      <textarea name="textArea" class="text-area" cols="65" rows="10" autofocus unselectable="on"></textarea>
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
  <footer class="footer">
    <p>Keyboard was created in <b>OS Windows</b></p>
    <p>To switch language use: <b>Alt + Shift</b> combination</p>
  </footer>
  `;
}
