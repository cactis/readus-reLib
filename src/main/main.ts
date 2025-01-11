import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  ipcRenderer,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { log as _log } from '../libs/lib';
import log from 'electron-log';

require('../libs/db/index');
const { Book } = require('../libs/db/models/index');
import { addBooks, getBookContent, loadBooks } from '../libs/library';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// ipcMain.handle('read-user-data', async (event, fileName) => {
//   const path = app.getPath('userData');
//   return path;
// });

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  _log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('addBook', (event, arg = {}) => {
  addBooks(arg.url);
});

ipcMain.on('getAppPath', (event, arg) => {
  const path = app.getAppPath();
  _log(path, 'path in : ');
  // const file = `file://${path}/books.json`;
  // _log(file, 'file in : ');
  // shell.openExternal(file);
  // shell.showItemInFolder(path);
  event.reply('getAppPath', path);
});

ipcMain.on('loadBooksData', (event, arg) => {});

ipcMain.on('getBookContent', (event, arg = {}) => {
  _log([event, arg], '[event, arg] in : ipcMain.on(getBook)');
  const { url } = arg;
  _log(url, 'url in : ');
  getBookContent(url).then((data) => {
    _log(data, 'data in : ');
    event.reply('getBookContent', data);
  });
  // const books = loadBooks({ keyword });
});

ipcMain.on('loadBooks', (event, arg = {}) => {
  _log([event, arg], '[event, arg] in : ipcMain.on(loadBooks)');
  const { keyword } = arg;
  loadBooks({ keyword }).then((books) => {
    _log(books, 'books in : ');
    event.reply('booksLoad', books);
  });
});

ipcMain.on('openBookChooserDialog', (event, arg) => {
  // _log([event, arg], '[event, arg] in : ');
  dialog
    .showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Epub Files', extensions: ['epub'] }],
    })
    .then((result) => {
      // _log(result, 'result in : ');
      if (!result.canceled) {
        addBooks(result.filePaths).then((books) => {
          // _log(books, 'books in on openBookChooserDialog: ');
          // sendMessage('addBooksToLibrary', { books });
        });
      }
    })
    .catch((err) => {
      _log(err);
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
  if (isDebug) {
    await installExtensions();
  }

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
      contextIsolation: true,
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
