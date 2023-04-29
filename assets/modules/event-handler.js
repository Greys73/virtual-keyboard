import { calcSymbol } from './utils.js';
import { typeSymbol, execCommand } from './typer.js';

export default function eventHandler(event) {
  const obj = event.target;
  const key = window.keys.find((elem) => elem.id === obj.id);
  const val = calcSymbol(key);
  switch (event.type) {
    case 'mousedown':
      obj.classList.add('key_pressed');
      if (!key.type) {
        typeSymbol(val);
      } else {
        execCommand(key.code, event);
      }
      break;
    case 'mouseup':
      obj.classList.remove('key_pressed');
      if (key.type) {
        execCommand(key.code, event);
      }
      break;
    case 'mouseleave':
      if (obj.innerText !== 'Shift') { // exception for shift
        obj.classList.remove('key_pressed');
      }
      break;
    default: break;
  }
}
