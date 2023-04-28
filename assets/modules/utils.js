/* eslint-disable import/extensions */
import { SETTINGS } from './variables.js';

export async function loadJSON(file) {
  const response = await fetch(file);
  const json = await response.json();
  return json;
}

export function calcSymbol(obj) {
  let type = 'def';
  if (/[a-zA-Zа-яА-ЯёЁ]/i.test(obj.langs[SETTINGS.lang][type])) { // exception for letters
    type = (SETTINGS.shiftPressed !== SETTINGS.capsLock) ? 'mod' : 'def';
  } else if (SETTINGS.shiftPressed) {
    type = 'mod';
  } else {
    type = 'def';
  }
  return obj.langs[SETTINGS.lang][type];
}

export function changeLang() {
  const id = SETTINGS.languages.findIndex((elem) => elem === SETTINGS.lang);
  SETTINGS.lang = SETTINGS.languages[(id < SETTINGS.languages.length - 1) ? id + 1 : 0];
}

export function changeTextLine(text, dir) {
  const start = text.selectionStart; // абсолютная позиция
  const lines = text.value.split('\n'); // разбивка по строкам
  const curLine = text.value.substr(0, start).split('\n'); // разбивка до текущей строки (включительно)
  const linePos = curLine[curLine.length - 1].length;// позиция в текущей строке
  let targetLine = curLine.length + dir; // целевая строка
  if (targetLine <= 0) {
    targetLine = 1;
  }
  if (targetLine > lines.length) {
    targetLine = lines.length;
  }
  const targetPos = lines.slice(0, targetLine - 1) // обрезаем массив до целевой строки
    .reduce((acc, s) => acc + s.length + 1, 0) // суммируем длины строк
    + Math.min(lines[targetLine - 1].length, linePos); // прошлая позиция, либо конец строки
  return targetPos;
}

export function splitText(text) {
  if (text.length < 1) { return text; }
  const lineLength = 65;
  const lines = text.split('\n');
  const reg = new RegExp(`.{1,${lineLength}}`, 'g');
  const result = lines.map((str) => {
    let res = '';
    if (str.length > 0) { res = str.match(reg).join('\n'); }
    return res;
  }).join('\n');
  return result;
}

export function saveToStorage() {
  const text = document.getElementsByClassName('text-area')[0].value;
  sessionStorage.setItem('virtualKeyboard', JSON.stringify({
    text,
    language: SETTINGS.lang,
    capsLock: SETTINGS.capsLock,
  }));
}

export function loadFromStorage() {
  const storage = JSON.parse(sessionStorage.getItem('virtualKeyboard'));
  if (storage) {
    document.getElementsByClassName('text-area')[0].value = storage.text;
    SETTINGS.lang = storage.language;
    SETTINGS.capsLock = storage.capsLock;
  }
}
