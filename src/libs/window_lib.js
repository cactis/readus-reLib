import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { delayed, funcId, log } from './lib.js';
import Peer from 'peerjs';

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

const peerSend = (data) => {
  log(data, 'data in peerSend: ');
  if (window?.conn) {
    window?.conn.send(JSON.stringify(data));
  }
};

const getBase64 = (file) => {
  const ext = file.split('.')[(-1, 1)];
  let pre = `data:image/${ext};base64,`;
  return new Promise((resolve, reject) => {
    fetch(`file://${file}`)
      .then((response) => response.arrayBuffer())
      .then((ab) => {
        var binary = '';
        var bytes = new Uint8Array(ab);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64String = window.btoa(binary);
        resolve(`${pre}${base64String}`);
      })
      .catch((err) => reject(err));
  });
};

const peerConnect = (props = {}) => {
  log('peerConnecting');

  const peer = new Peer('reLib-desktop', {
    host: 'readus.org',
    port: 9009,
    path: '/webrtc',
    debug: 3,
  });

  onMessage('booksLoad', (books) => {
    log(books.length, 'books.length in : ');
    Promise.all(
      books.map((book, i) => {
        // return book;
        return getBase64(book.cover).then((cover) => {
          // log(cover, 'cover in : ');
          book = { ...book, cover };
          // log(book, 'book in : ');
          return book;
        });
      }),
    ).then((books) => {
      log(books, 'books in Promise.all.then: ');
      peerSend({ data: books, size: books.length, event: 'booksLoad' });
    });
  });

  onMessage('getBookContent', (data) => {
    log(data, 'data in getBookContent: ');
    peerSend({ data: data, event: 'getBookContent' });
  });
  peer.on('connection', (conn) => {
    log(conn, 'conn on event : conn:connection');
    window.conn = conn;

    conn.on('open', (e) => {
      log(e, 'e in : ');
      let msg = {
        msgName: 'Hello fron desktop',
        sendTime: Date.now(),
      };
      conn.send(JSON.stringify(msg));
    });

    conn.on('data', (data) => {
      data = JSON.parse(data);
      log(data, 'received data on event : conn:data');
      let { request, url, keyword } = data;

      if (request && url) {
        log(url, 'url in : ');
        switch (true) {
          case /\/books$/.test(url):
            sendMessage('loadBooks', { keyword });
            break;
          case /\/Users/.test(url):
            sendMessage('getBookContent', { url });
            break;
          default:
            break;
        }
      }
    });
  });
  peer.connect('reLib-client');
};

export {
  peerConnect,
  renderComponent,
  sendMessage,
  onMessage,
  runLast,
  getEventPos,
};
