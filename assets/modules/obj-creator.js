/* eslint-disable import/extensions */
import { calcSymbol, typeSymbol, execCommand } from './typing.js';

function processEvent(target, event) {
  const obj = window.keys.find((elem) => elem.id === target);
  const val = calcSymbol(obj);
  if (!obj.type) {
    if (event === 'mousedown') {
      typeSymbol(val);
    }
  } else {
    execCommand(obj.code, event);
  }
}

function mouseDown(e) {
  e.target.classList.toggle('key_pressed');
  processEvent(e.target.id, 'mousedown');
}
function mouseUp(e) {
  e.target.classList.remove('key_pressed');
  processEvent(e.target.id, 'mouseUp');
}
function mouseLeave(e) {
  if (e.target.innerText !== 'Shift') {
    e.target.classList.remove('key_pressed');
    processEvent(e.target.id, 'mouseUp');
  }
}

export default function createObject(_obj) {
  const obj = _obj;
  const range = `range${obj.id.split('_')[0]}`;
  obj.DOMElement = document.createElement('div');
  obj.DOMElement.id = obj.id;
  obj.DOMElement.className = 'key';
  obj.DOMElement.blur();
  if ('type' in obj) {
    obj.DOMElement.classList.toggle('key__extra');
  }
  if ('size' in obj) {
    obj.DOMElement.style.width = `${parseInt(obj.size, 10)}px`;
  }
  document.getElementById(range).appendChild(obj.DOMElement);
  obj.DOMElement.addEventListener('mousedown', mouseDown);
  obj.DOMElement.addEventListener('mouseup', mouseUp);
  obj.DOMElement.addEventListener('mouseleave', mouseLeave);
  return false;
}
