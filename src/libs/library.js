import { app, contextBridge } from 'electron';
import { log } from './lib';

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const Vibrant = require('node-vibrant/browser');
const Epub = require('epub2').EPub;
const convert = require('ebook-convert');

const booksExtensions = ['epub', 'mobi'];

let _ = require('lodash');

export const addBooks = async (files) => {
  // log(files, 'files in addBooks: ');
  return Promise.all(_.map(files, (file) => addBook(file))).then((books) => {
    log(books, 'books in : ');
    addBooksToStorage(books);
    return 'books added';
  });
};

const addBook = async (file) => {
  log(file, 'file in addBook: ');
  let appPath = app.getAppPath();
  const coversPath = `${app.getPath('userData')}/covers`;
  // let url = URL.createObjectURL(file);
  // log(url, 'url in : addBook');
  // return new Promise((resolve) => {
  return getChecksum(file).then((id) => {
    // log(id, 'id in : ');
    return Epub.createAsync(file, null, null).then((epub) => {
      log(epub, 'epub in : ');
      // log(process, 'process in : ');
      // log(appPath, 'appPath in : ');
      let cover = `${appPath}/assets/images/cover-not-available.jpg`;
      let coverExt = epub.metadata.cover
        ? _.last(epub.manifest[epub.metadata.cover]?.href.split('.'))
        : null;
      if (coverExt) cover = `${coversPath}/${id}.${coverExt}`;
      epub.getImageAsync(epub.metadata.cover).then(async function ([data, _]) {
        await fse.outputFile(cover, data, 'binary');
      });

      var book = {
        title: epub.metadata.title || 'unknown',
        author: epub.metadata.creator || 'unknown',
        cover: cover,
        url: file,
        data: epub.metadata.date,
        language: epub.metadata.language,
        publisher: epub.metadata.publisher,
        id,
      };
      // log(book, 'book in addBook: ');
      return book;
    });
  });
  // });
};

export const addBooksToStorage = (books) => {
  let _books = loadBooks();
  _books = _.concat(_books, books);
  _books = _.uniqBy(_books, 'id');
  saveBooks(_books);
};

export const loadBooks = () => {
  return getStorage('books') || [];
};

// contextBridge.exposeInMainWorld('Library', {
//   loadBooks: (files) => loadBooks(files),
// });

const storage_file = '.data/books.json';

export const getStorage = (key) => {
  let data = [];
  try {
    data = fs.readFileSync(storage_file, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const saveBooks = (data) => {
  // let storage = getStorage() || {};
  // storage[key] = data;
  let _storage = JSON.stringify(data, null, 2);
  log(_storage, '_storage in : ');
  fs.writeFileSync(storage_file, _storage);
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
