console.log('src/main/preload.ts loaded');

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { log } from '../libs/lib';
import { getStorage, loadBooks } from '../libs/library';

const { app } = require('electron');

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const Vibrant = require('node-vibrant/browser');
const Epub = require('epub2').EPub;
const convert = require('ebook-convert');

const booksExtensions = ['epub', 'mobi'];

let _ = require('lodash');

// const addBooks = async (files) => {
//   // log(files, 'files in addBooks: ');
//   await _.map(files, (file) => {
//     addBook(file);
//   });
// };

// const addBook = async (file) => {
//   log(file, 'file in addBook: ');
//   // let url = URL.createObjectURL(file);
//   // log(url, 'url in : addBook');
//   return Epub.createAsync(file, null, null).then((epub) => {
//     log(epub, 'epub in : ');
//     return epub;
//   });

//   return new Promise((resolve) => {
//     log(file, 'file in addBook: ');
//   });
// };
export const getBooks = () => {
  let books = loadBooks();
  log(books, 'books in : ');
  books = books.map((book, i) => {
    // book.cover = `${app.getPath('userData')}`;
    return book;
  });
  return books || [];
};

contextBridge.exposeInMainWorld('Library', {
  getBooks: (files) => getBooks(files),
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

export type ElectronHandler = typeof electronHandler;
