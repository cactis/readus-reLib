const { stripTags, removeSpace, log } = require('../lib');
const path = require('path');
const { dbStorage } = require('./database');
let _db;
const _ = require('lodash');
// const Database = require('better-sqlite3');
// log(Database, 'Database in : ');

// const icu = require('@sqlite.org/icu');
const nodejieba = require('nodejieba'); // 使用 jieba 作為自訂分詞
const { Book } = require('./models/Book');
log(nodejieba, 'nodejieba in : ');

// try {
//   _db.loadExtension('/path/to/nodejieba_extension');
//   log('Nodejieba extension loaded successfully');
// } catch (error) {
//   log('Error loading Nodejieba extension:', error);
// }

// log(
//   nodejieba.cut('中文Love測試分詞', true).join(' '),
//   "nodejieba.cut('中文Love測試分詞').join(' ') in : ",
// );

const loadDb = () => {
  log(dbStorage, 'dbStorage in createFTS5: ');
  _db = require('better-sqlite3')(dbStorage, {
    verbose: console.log,
    fileMustExist: true,
  });
  _db.pragma('journal_mode = WAL');
  return _db;
};

function vacuumDatabase() {
  if (!_db) _db = loadDb();
  log('開始 VACUUM 資料庫...');
  _db.exec('VACUUM', function (err) {
    if (err) {
      log('VACUUM 執行錯誤:', err);
    } else {
      log('VACUUM 完成。');
    }
  });
}
// const db = () => {
//   return _db || loadDb();
// };

// _db.exec('PRAGMA auto_vacuum = 0');
// log('execute auto_vacuum');
// _db.commit();
// _db.commit();

// const db = new Database(dbStorage);
// log(db, 'db in : ');
// _db.loadExtension(icu.path);

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

// CREATE TRIGGER IF NOT EXISTS books_after_insert
// AFTER INSERT ON books
// BEGIN
// INSERT INTO Books_fts (book_id, content)
// VALUES (NEW.id, NEW.content);
// END;

const dropFts5Table = () => {
  log('dropFts5Table run');
  if (!_db) _db = loadDb();
  _db.exec(`
    DROP TABLE IF EXISTS Books_fts;
  `);
};

function segmentText(text) {
  // 使用 Jieba 分詞，也可以選擇其他分詞器
  // log(nodejieba.cut(text).join(' '), "nodejieba.cut(text).join(' ') in : ");
  text = stripTags(text);
  // log(text, 'text in : ');
  // log(text, 'text in : ');
  text = nodejieba.cut(text, true).join(' ');
  // data = removeSpace(data);
  // log(data, 'data in setmentText: ');

  return text;
}

function deleteAllBooksFTS() {
  if (!_db) _db = loadDb();
  _db.exec('DELETE FROM Books_fts');
}

function insertBookFTS(bookId, content) {
  if (!_db) _db = loadDb();
  // log(bookId, 'bookId in insertBookFTS: ');
  // log(segmentedContent, 'segmentedContent in : ');
  const segmentedContent = segmentText(content);

  // const segmentedContent = content;
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
  // const segmentedQuery = segmentText(query);
  const segmentedQuery = query;
  // const rows = db
  //   .prepare(
  //     `
  //       SELECT distinct id, snippet(Books_fts, 1, '<b>', '</b>', '...', 20) as highlight
  //       FROM books
  //       JOIN Books_fts ON books.id = Books_fts.book_id
  //       WHERE Books_fts MATCH ?
  //   `,
  //   )
  //   .all(segmentedQuery);
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
  // return { countOfBooks: 999, countOfBookFts: 999 };
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
