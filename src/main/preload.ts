import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { getAppPath, loadBooks, loadBooksData } from '../libs/library';

console.log('src/main/preload.ts loaded');

let _ = require('lodash');

contextBridge.exposeInMainWorld('Library', {
  loadBooks,
  getAppPath,
  loadBooksData,
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
