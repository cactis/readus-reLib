import { app, BrowserWindow, contextBridge, ipcMain } from 'electron';
import { isDev, log } from './lib';
import { Book } from './db/models';
import { Op } from 'sequelize';
import { coversPath, getDataPath } from './db/database';
import { insertBookFTS } from './db/createFTS5';

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
      getDataFromEpub(file).then((book) => {
        try {
          let cond = { sha256: book.sha256 };
          Book.findAll({ where: cond }).then((sameBooks) => {
            // log(sameBooks, 'sameBooks in : ');
            if (sameBooks.length > 0) {
              log('existed!', "'existed!' in : ");
              let _book = sameBooks[0];
              Book.update(
                { url: _.uniq([..._book.url, book.url]), ...book },
                { where: cond },
              ).then(() => {
                return book;
              });
            } else {
              // Book.create(book).then((book) => {
              //   book.save().then(() => {
              //     log('book created', "'book created' in : ");
              //     BrowserWindow.getFocusedWindow().webContents.send(
              //       'bookAdded',
              //       book,
              //     );
              //   });
              // });
              // log(e, 'e in Book.build: ');
              Book.prototype.build(book).then((book) => {
                // log(book, 'book in : ');
                log('book created', "'book created' in : ");
                let _book = book.dataValues;
                let { id, content } = _book;
                log(id, 'id in : ');
                BrowserWindow.getFocusedWindow().webContents.send(
                  'bookAdded',
                  _book,
                );
                insertBookFTS(id, content.join(''));
              });
            }
          });

          // Book.findAll().then((books) => {
          //   log(books, 'books in : ');
          // });
          // mainWindow.webContents.send('recieveBooks', JSON.stringify(books, null, 2));//Push our data to component once mounted.
        } catch (e) {
          console.log(`Error selecting books ${e}`);
        }

        return book;
      }),
    ),
  ).then((books) => {
    return books;
  });
};

export const getAppPath = () => {
  // log(app, 'app in : ');
  return app.getAppPath();
};

export const loadContent = (file) => {
  return new Promise((resolve, reject) => {
    Epub.createAsync(file, null, null).then((epub) => {
      // log(epub, 'epub in : ');
      const { toc } = epub;
      const { contents } = epub.spine;
      Promise.all(
        contents.map((chapter, i) =>
          epub.getChapterAsync(chapter.id).then((texts) => {
            // log(texts, 'texts in : ');
            return texts;
          }),
        ),
      ).then((result) => resolve(result));
    });
  });
};

const getDataFromEpub = async (file) => {
  log(file, 'file in getDataFromEpub: ');
  return getSha256(file).then((sha256) => {
    // log(id, 'id in : ');
    try {
      return Epub.createAsync(file, null, null).then((epub) => {
        let appPath = getAppPath();
        // log(appPath, 'appPath in : ');
        let cover = `${appPath}/assets/images/cover-not-available.jpg`;
        let coverExt = epub.metadata.cover
          ? _.last(epub.manifest[epub.metadata.cover]?.href.split('.'))
          : null;
        if (coverExt) cover = `${coversPath}/${sha256}.${coverExt}`;
        log(coversPath, 'coversPath in : ');
        return epub.getImageAsync(epub.metadata.cover).then(async function ([
          data,
          _,
        ]) {
          return fse.outputFile(cover, data, 'binary').then(() => {
            return loadContent(file).then((content) => {
              var book = {
                sha256,
                title: epub.metadata.title || 'unknown',
                author: epub.metadata.creator || 'unknown',
                cover: cover,
                url: [file],
                content,
                date: epub.metadata.date,
                language: epub.metadata.language,
                publisher: epub.metadata.publisher,
                createdAt: new Date(),
              };
              // log(book, 'book in getDataFromEpub: ');
              return book;
            });
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

export const loadBooksData = (arg = {}) => {
  let { keyword } = arg;
  // log(process.env.NODE_ENV, 'process.env.NODE_ENV in : ');
  // log(isDev(), 'isDev() in : ');
  // log(keyword, 'keyword in library.js#loadBooks: ');
  let where = keyword
    ? {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { author: { [Op.like]: `%${keyword}%` } },
        ],
      }
    : {};

  return Book.findAll({
    attributes: { exclude: ['content'] },
    where,
  }).then((books) => {
    // log(books[(-1, 1)], 'books[-1,1] in : ');
    books = books.map((item, i) => item.dataValues);
    // log(books, 'books in loadBooksData: ');
    return books;
  });
  // let books = getStorage('books') || {};
  // log(books, 'books in loadBooks: ');
  // books = _.compact(books);
  // return books;
};
export const loadBooks = (arg = {}) => {
  let books = loadBooksData(arg);
  // let { keyword } = arg;
  // let books = loadBooksData(arg);
  // // log(Object.keys(books), 'Object.keys(books) in : ');
  // books = Object.keys(books).map((id, i) => {
  //   return { id, ...books[id] };
  // });
  // if (keyword) {
  //   books = books.filter(
  //     (book, i) =>
  //       book.title.indexOf(keyword) > -1 || book.author.indexOf(keyword) > -1,
  //   );
  // }
  // books = books.sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1));
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

const getSha256 = (path) => {
  // log(path, 'path in getSha256: ');
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
      // log(sha256, 'sha256 in getSha256: ');
      resolve(sha256);
    });
  });
};

// export const getBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     if (typeof file == 'string') {
//       resolve(window.currentEpub.base64);
//     } else {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         let base64 = reader.result.toString();
//         // let sha256 = getSha256(base64)
//         // let md5 = getMd5(base64)
//         // let { sha256, md5 } = getSha256FromFile(file)
//         getSha256FromFile(file).then(({ sha256, md5 }) => {
//           log(sha256, 'sha256 in : ');
//           resolve({ md5, sha256, base64 });
//         });
//       };
//       reader.onerror = (error) => reject(error);
//     }
//   });
// };
// export const getSha256FromFile = (file) => {
//   return new Promise((resolve, reject) => {
//     var reader = new FileReader();
//     reader.onload = function (e) {
//       var wordArray = CryptoJS.lib.WordArray.create(e.target.result);
//       var sha256 = CryptoJS.SHA256(wordArray).toString();
//       var md5 = CryptoJS.MD5(wordArray).toString();
//       resolve({ md5, sha256 });
//     };
//     reader.readAsArrayBuffer(file);
//   });
// };

// getMd5 = (data) => {
//   return MD5(JSON.stringify(data)).toString()
// }

// getSha256 = (data) => {
//   return SHA256(data).toString()
// }
