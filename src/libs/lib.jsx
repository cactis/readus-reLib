import React from 'react';
import ReactDOM from 'react-dom/client';
import { delayed, funcId } from './lib';

export const renderComponent = (component) => {
  let body = document.getElementsByTagName('body')[0];
  let span = document.createElement('wrapper');
  body.appendChild(span);
  const root = ReactDOM.createRoot(span);
  root.render(component);
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
