import eventHandler from './event-handler.js';

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
  obj.DOMElement.addEventListener('mousedown', eventHandler);
  obj.DOMElement.addEventListener('mouseup', eventHandler);
  obj.DOMElement.addEventListener('mouseleave', eventHandler);
  return false;
}
