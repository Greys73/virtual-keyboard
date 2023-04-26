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
  obj.DOMElement = document.createElement('div');
  obj.DOMElement.className = 'key';
  obj.DOMElement.id = obj.id;
  obj.DOMElement.addEventListener('mousedown', mouseDown);
  obj.DOMElement.addEventListener('mouseup', mouseUp);
  obj.DOMElement.addEventListener('mouseleave', mouseLeave);
  return false;
}
