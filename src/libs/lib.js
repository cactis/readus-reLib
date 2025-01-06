// import { ipcRenderer } from 'electron';

import LZString from 'lz-string';
import MD5 from 'crypto-js/md5';
// import { machineId, machineIdSync } from 'node-machine-id';
// import { first, all } from 'macaddress-local-machine';

export const randStr = (pre) => {
  let _pre = pre ? `${pre}-` : '';
  return _pre + (Math.random() + 1).toString(36).substring(4);
};

export const newArray = (number) => {
  return Array.from(Array(number).keys());
};

export const log = (msg, title = '') => {
  console.log(`--- ${title}`);
  console.log(msg);
  console.log(`--- ${title}`);
};

export const stop = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
};

export const sendMessage = (event, data) => {
  log([event, data], '[event, data] in lib#sendMessage: ');
  window.electron.ipcRenderer.sendMessage(event, data);
};

export const onMessage = (event, run) => {
  // log([event, run], '[event, run] in lib#onMessage: ');
  window.electron.ipcRenderer.on(event, run);
};

export const broadcast = (status, data = {}, from = '') => {
  // log([status, data], '[status, data] in Lib#broadcast: ');
  let message = { status, data };
  if (data) $('body').trigger('onWsMessage', { message });
};

export const subscribe = (callback) => {
  $('body').on('onWsMessage', (e, { message }) => {
    // log(message, 'message in Lib#subscribt: ');
    let { status, data, info } = message;
    // log(info, 'info in : ');
    if (info) tip(info);
    callback && callback({ status, data });
  });
};

export const tip = (msg) => {
  log(msg, 'msg in : ');
};
export const delayed = (func, wait = 1000, ...args) => {
  let timeoutId = setTimeout((args) => {
    func.apply(null, args);
  }, wait);
  return timeoutId;
};

export const isDev = () => {
  return process.env.NODE_ENV == 'development';
};

export const funcId = (func) => {
  return MD5(String(func)).toString();
};

// export const userDataPath = (run) => {
//   ipcRenderer.invoke('user-data-path').then((path) => run(path));
// };
let ws;
export const wsConnect = (props) => {
  if (ws) ws.close();
  let url = 'wss://readus.org/cable';
  // let url = 'ws://192.168.31.207:3000/';
  // log(url, 'url in wsConnect: ');
  ws = new WebSocket(url);
  // log(ws, 'ws in : ');
  window.ws = ws;
  let runCommand = (command, data) => {
    // log(command, 'command in runCommand: ');
    let token = 'abc';
    if (token) {
      var msg = {
        command: command,
        identifier: '{"channel": "ChatChannel", "room": "' + token + '"}',
      };
      msg.data = data;
      const text = JSON.stringify(msg);
      // log(text, 'text in runCommand: ');
      ws.send(text);
    }
  };
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case 'ping':
        break;
      case 'welcome':
        log('welcome connected.');
        break;
      default:
        log(data, 'data in ws.onmessage: ');
        break;
    }
  };
  ws.onclose = (e) => {
    log(e, 'e # _ws.onclose');
  };
  ws.onerror = function (err) {
    log(err, 'err in ws.onerror');
  };
  ws.onopen = (_this, ev) => {
    // log(_this, '_this in : ');
    // log('ws.onopen');
    runCommand('subscribe');
  };
};

export const wsClose = (props) => {
  if (ws) ws.close();
};

export const copyToClipboard = (text) => {
  setStorage('clipboard', text);
  // popup({ title: '複製成功', message: getStorage('clipboard') })
  log(text, 'text in : ');
  tip(`${text.slice(0, 20)}... Copy done!`);
  const elem = document.createElement('textarea');
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
};

export const setStorage = (key, value) => {
  log([key, value], '[key, value] in Lib#setStorage');
  if (key) {
    var compressed = compress(JSON.stringify(value));
    localStorage.setItem(key, compressed);
    return getStorage(key);
  }
};

export const getStorage = (key) => {
  // log(key, 'key in getStorage')
  if (!key) return null;
  var decompressed = decompress(localStorage.getItem(key));
  let v = decompressed;
  return v ? JSON.parse(v) : null;
};

export const compress = (data) => {
  return LZString.compressToUTF16(data);
};
export const decompress = (data) => {
  return LZString.decompressFromUTF16(data);
};
