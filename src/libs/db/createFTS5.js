const { stripTags, removeSpace, log } = require('../lib');
const fs = require('fs');
const path = require('path');
// const fs = require('fs');
const { dbStorage } = require('./database');
let _db;
const _ = require('lodash');
// const Database = require('better-sqlite3');
// log(Database, 'Database in : ');

// const icu = require('@sqlite.org/icu');
const nodejieba = require('nodejieba'); // 使用 jieba 作為自訂分詞
const { Book } = require('./models/Book');

let options = {
  dict: path
    .join(__dirname, '../../assets/dict/jieba.dict.utf8')
    .replace('/app', ''),
  hmmDict: path
    .join(__dirname, '../../assets/dict/hmm_model.utf8')
    .replace('/app', ''),
  userDict: path
    .join(__dirname, '../../assets/dict/user.dict.utf8')
    .replace('/app', ''),
  idfDict: path
    .join(__dirname, '../../assets/dict/idf.utf8')
    .replace('/app', ''),
  stopWordDict: path
    .join(__dirname, '../../assets/dict/stop_words.utf8')
    .replace('/app', ''),
};

// log(options, 'options in : ');
// nodejieba.load(options);
nodejieba.DEFAULT_DICT = options.dict;
nodejieba.DEFAULT_HMM_DICT = options.hmmDict;
nodejieba.DEFAULT_USER_DICT = options.userDict;
nodejieba.DEFAULT_IDF_DICT = options.idfDict;
nodejieba.DEFAULT_STOP_WORD_DICT = options.stopWordDict;

// log(nodejieba, 'nodejieba in : ');

const loadDb = () => {
  // log(dbStorage, 'dbStorage in createFTS5: ');
  _db = require('better-sqlite3')(dbStorage, {
    verbose: console.log,
    fileMustExist: true,
  });
  _db.pragma('journal_mode = WAL');
  return _db;
};

function vacuumDatabase() {
  if (!_db) _db = loadDb();
  // log('開始 VACUUM 資料庫...');
  _db.exec('VACUUM', function (err) {
    if (err) {
      log('VACUUM 執行錯誤:', err);
    } else {
      log('VACUUM 完成。');
    }
  });
}

const createFts5Table = (tokenizer = 'unicode61') => {
  log('createFts5Table run');
  if (!_db) _db = loadDb();
  _db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS Books_fts USING fts5(
      book_id UNINDEXED,
      content,
      tokenize = "${tokenizer}"
    );

    CREATE TRIGGER IF NOT EXISTS books_after_update
      AFTER UPDATE ON books
      BEGIN
      UPDATE Books_fts SET content = NEW.content WHERE book_id = NEW.id;
    END;

    CREATE TRIGGER IF NOT EXISTS books_after_delete
      AFTER DELETE ON books
      BEGIN
      DELETE FROM Books_fts WHERE book_id = OLD.id;
    END;
      `);

  log('createFts5Table run done');
};

const dropFts5Table = () => {
  log('dropFts5Table run');
  if (!_db) _db = loadDb();
  _db.exec(`
    DROP TABLE IF EXISTS Books_fts;
  `);
};

function segmentText(text) {
  text = stripTags(text);
  text = nodejieba.cut(text, true).join(' ');
  return text;
}

function deleteAllBooksFTS() {
  if (!_db) _db = loadDb();
  _db.exec('DELETE FROM Books_fts');
}

function insertBookFTS(bookId, content) {
  if (!_db) _db = loadDb();
  const segmentedContent = segmentText(content);

  const prepare = _db.prepare(
    'INSERT INTO Books_fts (book_id, content) VALUES (@bookId, @segmentedContent)',
  );
  prepare.run({ bookId, segmentedContent });
}

function updateBookFTS(bookId, content) {
  if (!_db) _db = loadDb();
  const segmentedContent = segmentText(content);
  _db.exec('UPDATE Books_fts SET content = ? WHERE book_id = ?', [
    segmentedContent,
    bookId,
  ]);
}

function deleteBookFTS(bookId) {
  if (!_db) _db = loadDb();
  // log(bookId, 'bookId in deleteBookFTS: ');
  const prepare = _db.prepare(`DELETE FROM Books_fts WHERE book_id = @bookId`);
  prepare.run({ bookId });
}

function searchBooksFTS(query) {
  log(query, 'query in searchBooksFTS: ');
  if (!query) return false;
  const segmentedQuery = query;
  if (!_db) _db = loadDb();
  let highlights = _db
    .prepare(
      `
      select book_id, snippet(Books_fts, 1, '<b>', '</b>', '...', 60) as highlight
      from Books_fts
      where Books_fts match ?
      `,
    )
    .all(segmentedQuery);

  log(highlights, 'highlights in : ');
  let result = {};

  highlights.forEach(
    (item, i) =>
      (result[item.book_id] = _.flatten([
        ...(result[item.book_id] || []),
        removeSpace(item.highlight),
      ])),
  );
  let ids = Object.keys(result);
  // log(ids, 'ids in : ');

  if (ids.length == 0)
    return new Promise((resolve, reject) => {
      resolve([]);
    });

  return Book.findAll({
    attributes: { exclude: ['content'] },
    where: { id: ids },
  }).then((rows) => {
    rows = rows.map((item, i) => item.dataValues);
    // log(rows, 'rows in : ');
    rows = rows.map((item, i) => {
      item.highlights = result[item.id];
      return item;
    });
    return rows;
  });
}

const dbStatus = () => {
  if (!_db) _db = loadDb();
  let countOfBooks = _db.prepare('select count(*) as c from books').all()[0].c;
  let countOfBookFts = _db
    .prepare('select count(*) as c from Books_fts')
    .all()[0].c;
  log([countOfBooks, countOfBookFts], '[countOfBooks, countOfBookFts] in : ');
  return { countOfBooks, countOfBookFts };
};

module.exports = {
  createFts5Table,
  searchBooksFTS,
  insertBookFTS,
  updateBookFTS,
  deleteBookFTS,
  deleteAllBooksFTS,
  dropFts5Table,
  dbStatus,
  vacuumDatabase,
};
