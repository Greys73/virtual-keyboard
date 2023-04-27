function mouseDown(e) {
  e.target.classList.toggle('key_pressed');
}
function mouseUp(e) {
  e.target.classList.remove('key_pressed');
}
function mouseLeave(e) {
  e.target.classList.remove('key_pressed');
}

export default function createObject(_obj) {
  const obj = _obj;
  const range = `range${obj.id.split('_')[0]}`;
  obj.DOMElement = document.createElement('div');
  obj.DOMElement.className = 'key';
  obj.DOMElement.id = obj.id;
  if ('size' in obj) {
    obj.DOMElement.style.width = `${parseInt(obj.size, 10)}px`;
  }
  obj.DOMElement.addEventListener('mousedown', mouseDown);
  obj.DOMElement.addEventListener('mouseup', mouseUp);
  obj.DOMElement.addEventListener('mouseleave', mouseLeave);
  document.getElementById(range).appendChild(obj.DOMElement); // place by position
  return false;
}
