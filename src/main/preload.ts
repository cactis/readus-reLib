import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { getAppPath, loadBooks, loadBooksData } from '../libs/library';

declare global {
  interface Window {
    jQuery: any;
    $: any;
    ePubCFI: any;
    ePubReader: any;
  }
}
// import { log } from '../libs';

window.addEventListener('load', () => {
  //inject jquery to page
  // window.$ = window.jQuery = require('../renderer/vendors/jquery.min.js');
  // require('../renderer/vendors/jszip.min.js');
  // require('../renderer/vendors/epub.js');
  // window.ePubCFI = require('../renderer/vendors/epub.js');
  // window.ePubReader = require('../renderer/vendors/reader.js');
  // window.$ = window.jQuery = require(
  //   path.join(__dirname, '/jquery-3.2.1.slim.min.js'),
  // );
});

function log(message, level = 'INFO') {
  ipcRenderer.send('log-from-renderer', message, level);
}

console.log = function (message) {
  log(message, 'INFO');
  // do not replace the actual console.log
  if (arguments.length > 1) console.__proto__.log.apply(this, arguments);
  else console.__proto__.log(message);
};

console.error = function (message) {
  log(message, 'ERROR');
  // do not replace the actual console.error
  if (arguments.length > 1) console.__proto__.error.apply(this, arguments);
  else console.__proto__.error(message);
};

// console.log('src/main/preload.ts loaded');

// let _ = require('lodash');

// const userDataPath = () => {
//   return app.getPath('userData');
// };

contextBridge.exposeInMainWorld('Library', {
  loadBooks,
  getAppPath,
  loadBooksData,
  // userDataPath,
});

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

const gonHandler = {
  appPath: '/',
};
contextBridge.exposeInMainWorld('gon', gonHandler);

export type ElectronHandler = typeof electronHandler;
