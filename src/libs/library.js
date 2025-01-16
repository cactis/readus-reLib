import { app, BrowserWindow, contextBridge, ipcMain } from 'electron';
import { env, isDev } from './lib';
import { Book } from './db/models';
import { Op } from 'sequelize';
import { coversPath, getDataPath } from './db/database';
import { insertBookFTS } from './db/createFTS5';
import { log } from './log';

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
              let { content } = book;
              delete book['content'];
              Book.create(book).then((book) => {
                book.save().then(({ dataValues }) => {
                  log('book created 2222');
                  let _book = dataValues;
                  let { id } = _book;
                  log(id, 'id in : ');
                  BrowserWindow.getFocusedWindow().webContents.send(
                    'bookAdded',
                    _book,
                  );
                  content.forEach((texts) => {
                    insertBookFTS(id, texts);
                  });
                });
              });

              // let { content } = book;
              // delete book['content'];
              // Book.prototype.build(book).then(({ dataValues }) => {
              //   // log(book, 'book in : ');
              //   log('book created', "'book created' in : ");
              //   let _book = dataValues;
              //   let { id } = _book;
              //   log(id, 'id in : ');
              //   BrowserWindow.getFocusedWindow().webContents.send(
              //     'bookAdded',
              //     _book,
              //   );
              //   content.forEach((texts) => {
              //     insertBookFTS(id, texts);
              //   });
              // });
            }
          });
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
  let where = keyword
    ? keyword.length == 1
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword[0]}%` } },
            { author: { [Op.like]: `%${keyword[0]}%` } },
          ],
        }
      : {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword[0]}%` } },
            { title: { [Op.like]: `%${keyword[1]}%` } },
            { author: { [Op.like]: `%${keyword[0]}%` } },
            { author: { [Op.like]: `%${keyword[1]}%` } },
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
};
export const loadBooks = (arg = {}) => {
  let books = loadBooksData(arg);
  return books;
};

export const getStorage__ = (key) => {
  let data;
  try {
    data = fs.readFileSync(storage_file(), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const saveBooks = (data) => {
  let _storage = JSON.stringify(data, null, 2);
  fs.writeFileSync(storage_file(), _storage);
};
const crypto = require('crypto');

const getSha256 = (path) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(path);
    input.on('error', reject);
    input.on('data', (chunk) => {
      hash.update(chunk);
    });
    input.on('close', () => {
      let sha256 = hash.digest('hex');
      resolve(sha256);
    });
  });
};
