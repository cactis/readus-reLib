import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { delayed, funcId, log } from './lib';
import { Popup } from '../components';

export const renderComponent = (component) => {
  let body = document.getElementsByTagName('body')[0];
  let span = document.createElement('wrapper');
  body.appendChild(span);
  const root = ReactDOM.createRoot(span);
  root.render(component);
};

export const sendMessage = (event, data) => {
  log([event, data], '[event, data] in lib#sendMessage: ');
  window.electron?.ipcRenderer.sendMessage(event, data);
};

export const onMessage = (event, run) => {
  // log([event, run], '[event, run] in lib#onMessage: ');
  window.electron?.ipcRenderer.on(event, run);
};

window._runLast = {};
export const runLast = (func, wait = 1000, ...args) => {
  // log(window._runLast, 'window._runLast in : 111')
  let key = funcId(func);
  // log([func, key], '[func, key] in : ')
  window._runLast[key] && clearTimeout(window._runLast[key]);
  window._runLast[key] = delayed(func, wait, ...args);
  // log(window._runLast, 'window._runLast in : 2222')
};

export const popup = (component, props) => {
  let target = $('body').append("<span class='unwrappable'></span>").children();
  target = _.last(target);
  log(target, 'target in : ');
  let root = createRoot(target);
  root.render(<Popup {...props}>{component}</Popup>);
};
