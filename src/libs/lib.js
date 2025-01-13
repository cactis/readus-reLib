const LZString = require('lz-string');
const MD5 = require('crypto-js/md5');

const randStr = (pre) => {
  let _pre = pre ? `${pre}-` : '';
  return _pre + (Math.random() + 1).toString(36).substring(4);
};

const newArray = (number) => {
  return Array.from(Array(number).keys());
};

const log = (msg, title = '') => {
  console.log(`--- ${title}`);
  console.log(msg);
  console.log(`--- ${title}`);
};

const stop = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
};

const stripTags = (html, ...args) => {
  // log(html, 'html in : ');
  log(typeof html, 'typeof html in : ');
  return html
    .replace(/<(\/?)(\w+)[^>]*\/?>/g, (_, endMark, tag) => {
      return args.includes(tag) ? '<' + endMark + tag + '>' : '';
    })
    .replace(/<!--.*?-->/g, '');
};

const broadcast = (status, data = {}, from = '') => {
  // log([status, data], '[status, data] in Lib#broadcast: ');
  let message = { status, data };
  if (data) $('body').trigger('onWsMessage', { message });
};

const subscribe = (callback) => {
  $('body').on('onWsMessage', (e, { message }) => {
    // log(message, 'message in Lib#subscribt: ');
    let { status, data, info } = message;
    // log(info, 'info in : ');
    if (info) tip(info);
    callback && callback({ status, data });
  });
};

const tip = (msg) => {
  log(msg, 'msg in : ');
};
const delayed = (func, wait = 1000, ...args) => {
  let timeoutId = setTimeout((args) => {
    func.apply(null, args);
  }, wait);
  return timeoutId;
};

const isDev = () => {
  return process.env.NODE_ENV == 'development';
};

const env = () => {
  return process.env.NODE_ENV.slice(0, 3);
};

const funcId = (func) => {
  return MD5(String(func)).toString();
};

let ws;
const wsConnect = (props = {}) => {
  let { token } = props;
  if (ws) ws.close();
  let url = 'wss://readus.org/cable';
  // let url = 'ws://192.168.31.207:3000/';
  // log(url, 'url in wsConnect: ');
  ws = new WebSocket(url);
  // log(ws, 'ws in : ');
  window.ws = ws;
  let runCommand = (command, data) => {
    // log(command, 'command in runCommand: ');
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

const wsClose = (props) => {
  if (ws) ws.close();
};

const copyToClipboard = (text) => {
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

const setStorage = (key, value) => {
  log([key, value], '[key, value] in Lib#setStorage');
  if (key) {
    var compressed = compress(JSON.stringify(value));
    localStorage.setItem(key, compressed);
    return getStorage(key);
  }
};

const getStorage = (key, value) => {
  let data = localStorage.getItem(key);
  if (data) {
    var _data = decompress(data);
    return _data ? JSON.parse(_data) : null;
  } else {
    return value ? setStorage(key, value) : null;
  }
};

const compress = (data) => {
  return LZString.compressToUTF16(data);
};
const decompress = (data) => {
  return LZString.decompressFromUTF16(data);
};

module.exports = {
  randStr,
  newArray,
  log,
  stop,
  broadcast,
  subscribe,
  tip,
  delayed,
  isDev,
  funcId,
  wsConnect,
  wsClose,
  copyToClipboard,
  setStorage,
  getStorage,
  compress,
  decompress,
  env,
  stripTags,
};
