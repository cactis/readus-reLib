const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
require('../libs/db/index');

import { autoUpdater } from 'electron-updater';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const { Book } = require('../libs/db/models/index');

import { log } from '../libs';

import {
  createFts5Table,
  dbStatus,
  deleteBookFTS,
  dropFts5Table,
  searchBooksFTS,
} from '../libs/db/createFTS5';
import { coversPath } from '../libs/db/database';
import { Note } from '../libs/db/models';
import { addBooks, getBookContent, loadBooks } from '../libs/library';

ipcMain.on('log-from-renderer', (event, message, level) => {
  log(`Renderer: ${message}`, level);
});

class AppUpdater {
  constructor() {
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

// console.log(process.env.PUBLIC_URL, '__static');

ipcMain.on('addBook', (event, arg = {}) => {
  addBooks(arg.url);
});

ipcMain.on('saveNote', async (event, data = {}) => {
  log([event, data], '[event, data] in : ipcMain.on(saveNote)');
  let [{ dataValues }, created] = await Note.findOrCreate({
    where: { id: data.id || null },
    defaults: data,
  });
  log(dataValues, 'dataValues in : ');
  event.reply('noteSaved', dataValues);
});

ipcMain.on('deleteBook', (event, data) => {
  Book.destroy({ where: { sha256: data.sha256 } }).then(() => {
    let { cover } = data;
    log(cover, 'cover in : ');
    fse.remove(cover);
    deleteBookFTS(data.id);
    // throw new Error('destroy error');
    event.reply('bookDeleted', data);
  });
});

ipcMain.on('openExternal', (event, arg) => {
  let { link } = arg;
  if (link) shell.openExternal(link);
});

ipcMain.on('getAppPath', (event, arg) => {
  const path = app.getAppPath();
  log(path, 'path in : ');
  event.reply('getAppPath', path);
});

ipcMain.on('getBookContent', (event, arg = {}) => {
  log([event, arg], '[event, arg] in : ipcMain.on(getBook)');
  const { url } = arg;
  log(url, 'url in : ');
  getBookContent(url).then((data) => {
    // log(data, 'data in : ');
    event.reply('getBookContent', data);
  });
  // const books = loadBooks({ keyword });
});

ipcMain.on('deleteAllBooks', (event, arg) => {
  Book.truncate();
  let path = coversPath;
  log(path, 'path in deleteAllBooks: ');
  fse.remove(path);
  dropFts5Table();
  createFts5Table();

  // const rimraf = require('rimraf');
  // rimraf.sync(path);
  event.reply('booksLoaded', { data: [], ...dbStatus() });
});

ipcMain.on('loadBooks', (event, arg = {}) => {
  let { keyword, searchBy = 'title' } = arg;

  var convertor = require('zh_cn_zh_tw');
  var zh_cn = convertor.convertToSimplifiedChinese;
  var zh_tw = convertor.convertToTraditionalChinese;

  log([keyword, searchBy], '[keyword, searchBy] in : ');
  if (keyword) {
    switch (searchBy) {
      case 'title':
        keyword = _.uniq([zh_tw(keyword), zh_cn(keyword)]);
        loadBooks({ keyword }).then((data) => {
          // log(data, 'data in : ');
          event.reply('booksLoaded', { data, ...dbStatus() });
        });
        break;
      default:
        if (keyword) {
          keyword = _.uniq([zh_tw(keyword), zh_cn(keyword)]).join(' OR ');
          searchBooksFTS(keyword).then((data) => {
            // log(data, 'data in : ');
            event.reply('booksLoaded', { data, ...dbStatus() });
          });
        }
        break;
    }
  } else {
    loadBooks().then((data) => {
      event.reply('booksLoaded', { data, ...dbStatus() });
    });
  }
});

ipcMain.on('openBookChooserDialog', (event, arg) => {
  log([event, arg], '[event, arg] in : ');
  dialog
    .showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Epub Files', extensions: ['epub'] }],
    })
    .then((result) => {
      log(result, 'result in : ');
      if (!result.canceled) {
        addBooks(result.filePaths).then((books) => {
          // log(books, 'books in on openBookChooserDialog: ');
          // sendMessage('addBooksToLibrary', { books });
        });
      }
    })
    .catch((err) => {
      log(err);
    });
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}
log(process.env.DEBUG_PROD, 'process.env.DEBUG_PROD in : ');

// log(dbStatus(), 'dbStatus() in : ');
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(log);
};

const createWindow = async () => {
  log(isDebug, 'isDebug in : ');
  if (isDebug) {
    await installExtensions();
  }

  app.commandLine.appendSwitch('remote-allow-origins', 'http://localhost:8315');

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('favicon.icon'),
    // icon: getAssetPath('icon.png'),
    webPreferences: {
      webviewTag: true,
      webSecurity: false,
      nodeIntegration: true,
      // contextIsolation: true,
      // enableRemoteModule: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.maximize();

  mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    // vacuumDatabase();
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(log);
