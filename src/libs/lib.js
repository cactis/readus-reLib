// import { ipcRenderer } from 'electron';

export const randStr = (pre) => {
  let _pre = pre ? `${pre}-` : '';
  return _pre + (Math.random() + 1).toString(36).substring(4);
};

export const newArray = (number) => {
  return Array.from(Array(number).keys());
};

export const log = (msg, pre = '') => {
  console.log(msg, pre);
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

export const delayed = (func, wait = 1000, ...args) => {
  let timeoutId = setTimeout((args) => {
    func.apply(null, args);
  }, wait);
  return timeoutId;
};

export const isDev = () => {
  return process.env.NODE_ENV == 'development';
};

// export const userDataPath = (run) => {
//   ipcRenderer.invoke('user-data-path').then((path) => run(path));
// };
