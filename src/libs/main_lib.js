import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { delayed, funcId, log } from './lib.js';
import { Popup } from '../components';

const renderComponent = (component) => {
  let body = document.getElementsByTagName('body')[0];
  let span = document.createElement('wrapper');
  body.appendChild(span);
  const root = ReactDOM.createRoot(span);
  root.render(component);
};

const sendMessage = (event, data) => {
  log([event, data], '[event, data] in lib#sendMessage: ');
  window.electron?.ipcRenderer.sendMessage(event, data);
};

const onMessage = (event, run) => {
  // log([event, run], '[event, run] in lib#onMessage: ');
  window.electron?.ipcRenderer.on(event, run);
};

window._runLast = {};
const runLast = (func, wait = 1000, ...args) => {
  // log(window._runLast, 'window._runLast in : 111')
  let key = funcId(func);
  // log([func, key], '[func, key] in : ')
  window._runLast[key] && clearTimeout(window._runLast[key]);
  window._runLast[key] = delayed(func, wait, ...args);
  // log(window._runLast, 'window._runLast in : 2222')
};

const getEventPos = (e) => {
  let pos = {};
  if (!e) return {};
  let x = e.clientX;
  let y = e.clientY;
  log([x, y], '[x, y] in : LIb#getMenuPos');
  if ((!x, !y))
    return {
      left: '50%',
      top: '50%',
      right: 'unset',
      bottom: 'unset',
      transform: 'translate(-50%, -50%)',
    };
  if (x < window.innerWidth / 2) {
    pos.left = x + 10;
  } else {
    pos.right = window.innerWidth - x + 10;
    pos.left = 'unset';
  }
  if (y < window.innerHeight / 2) {
    pos.top = y + 10;
  } else {
    pos.bottom = window.innerHeight - y + 10;
    pos.top = 'unset';
  }
  log(pos, 'pos in : ');
  return pos;
};

export { renderComponent, sendMessage, onMessage, runLast, getEventPos };
