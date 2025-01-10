import { app, BrowserWindow, contextBridge, ipcMain } from 'electron';
import { isDev, log } from './lib';

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const Vibrant = require('node-vibrant/browser');
const Epub = require('epub2').EPub;
const convert = require('ebook-convert');

const booksExtensions = ['epub', 'mobi'];

let _ = require('lodash');

const storage_file = () => {
  let _storageFile = `${app.getPath('userData')}/books.json`;
  // log(_storageFile, '_storageFile in : ');
  return _storageFile;
};

export const addBooks = async (files) => {
  return Promise.all(
    _.map(files, (file) =>
      addBook(file).then((book) => {
        BrowserWindow.getFocusedWindow().webContents.send('bookAdded', {
          id: book.id,
          ...book.meta,
          url: [book.meta.url],
        });
        addBooksToStorage(book);
        return book;
      }),
    ),
  ).then((books) => {
    // log(books, 'books in : ');
    // addBooksToStorage(books);
    return books;
  });
};

export const getAppPath = () => {
  // log(app, 'app in : ');
  return app.getAppPath();
};

export const getBookContent = (file) => {
  return new Promise((resolve, reject) => {
    Epub.createAsync(file, null, null).then((epub) => {
      // log(epub, 'epub in : ');
      const { toc } = epub;
      const { contents } = epub.spine;
      Promise.all(
        contents.map((chapter, i) =>
          epub.getChapterAsync(chapter.id).then((texts) => {
            log(texts, 'texts in : ');
            return texts;
          }),
        ),
      ).then((result) => resolve(result));
    });
  });
};

const addBook = async (file) => {
  log(file, 'file in addBook: ');
  const coversPath = `${app.getPath('userData')}/covers`;
  return getChecksum(file).then((id) => {
    // log(id, 'id in : ');
    try {
      return Epub.createAsync(file, null, null).then((epub) => {
        // log(epub, 'epub in : ');
        const { toc } = epub;
        const { contents } = epub.spine;
        Promise.all(
          contents.map((chapter, i) =>
            epub.getChapterAsync(chapter.id).then((texts) => {
              log(texts, 'texts in : ');
              return texts;
            }),
          ),
        ).then((result) => log(result, 'result in : '));

        let appPath = getAppPath();
        // log(appPath, 'appPath in : ');
        let cover = `${appPath}/assets/images/cover-not-available.jpg`;
        let coverExt = epub.metadata.cover
          ? _.last(epub.manifest[epub.metadata.cover]?.href.split('.'))
          : null;
        if (coverExt) cover = `${coversPath}/${id}.${coverExt}`;
        return epub.getImageAsync(epub.metadata.cover).then(async function ([
          data,
          _,
        ]) {
          return fse.outputFile(cover, data, 'binary').then(() => {
            var meta = {
              title: epub.metadata.title || 'unknown',
              author: epub.metadata.creator || 'unknown',
              cover: cover,
              url: file,
              date: epub.metadata.date,
              language: epub.metadata.language,
              publisher: epub.metadata.publisher,
              createdAt: new Date(),
            };
            // log(book, 'book in addBook: ');
            return { id, meta };
          });
        });
      });
    } catch (error) {
      log(error, 'error in : ');
      return null;
    }
  });
  // });
};

export const addBooksToStorage = ({ id, meta }) => {
  let _books = loadBooksData();
  let _meta = _books[id];
  if (_meta) {
    _meta.url = _.uniq([..._meta.url, meta.url]);
  } else {
    _meta = meta;
    _meta.url = [_meta.url];
  }
  _books[id] = _meta;
  saveBooks(_books);
};

export const loadBooksData = (arg = {}) => {
  // log(process.env.NODE_ENV, 'process.env.NODE_ENV in : ');
  // log(isDev(), 'isDev() in : ');
  // log(keyword, 'keyword in library.js#loadBooks: ');
  let books = getStorage('books') || {};
  // log(books, 'books in loadBooks: ');
  // books = _.compact(books);
  return books;
};
export const loadBooks = (arg = {}) => {
  let { keyword } = arg;
  let books = loadBooksData(arg);
  // log(Object.keys(books), 'Object.keys(books) in : ');
  books = Object.keys(books).map((id, i) => {
    return { id, ...books[id] };
  });
  if (keyword) {
    books = books.filter(
      (book, i) =>
        book.title.indexOf(keyword) > -1 || book.author.indexOf(keyword) > -1,
    );
  }
  books = books.sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1));
  return books;
};

// contextBridge.exposeInMainWorld('Library', {
//   loadBooks: (files) => loadBooks(files),
// });

export const getStorage = (key) => {
  let data;
  try {
    data = fs.readFileSync(storage_file(), 'utf-8');
    // log(data, 'data in getStorage: ');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const saveBooks = (data) => {
  // log(data, 'data in saveBooks: ');
  // log(data.length, 'data.length in saveBooks: ');
  // let storage = getStorage() || {};
  // storage[key] = data;
  let _storage = JSON.stringify(data, null, 2);
  // log(_storage, '_storage in : ');
  fs.writeFileSync(storage_file(), _storage);
};
const crypto = require('crypto');

const getChecksum = (path) => {
  // log(path, 'path in getChecksum: ');
  return new Promise((resolve, reject) => {
    // if absolutely necessary, use md5
    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(path);
    input.on('error', reject);
    input.on('data', (chunk) => {
      hash.update(chunk);
    });
    input.on('close', () => {
      let sha256 = hash.digest('hex');
      // log(sha256, 'sha256 in getChecksum: ');
      resolve(sha256);
    });
  });
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (typeof file == 'string') {
      resolve(window.currentEpub.base64);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64 = reader.result.toString();
        // let sha256 = getSha256(base64)
        // let md5 = getMd5(base64)
        // let { sha256, md5 } = getSha256FromFile(file)
        getSha256FromFile(file).then(({ sha256, md5 }) => {
          log(sha256, 'sha256 in : ');
          resolve({ md5, sha256, base64 });
        });
      };
      reader.onerror = (error) => reject(error);
    }
  });
};
export const getSha256FromFile = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var wordArray = CryptoJS.lib.WordArray.create(e.target.result);
      var sha256 = CryptoJS.SHA256(wordArray).toString();
      var md5 = CryptoJS.MD5(wordArray).toString();
      resolve({ md5, sha256 });
    };
    reader.readAsArrayBuffer(file);
  });
};

// getMd5 = (data) => {
//   return MD5(JSON.stringify(data)).toString()
// }

// getSha256 = (data) => {
//   return SHA256(data).toString()
// }
