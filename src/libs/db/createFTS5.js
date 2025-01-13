const { log, stripTags } = require('../lib');
const path = require('path');
const { dbStorage } = require('./database');

// const Database = require('better-sqlite3');
// log(Database, 'Database in : ');

// const icu = require('@sqlite.org/icu');
const nodejieba = require('nodejieba'); // 使用 jieba 作為自訂分詞
log(nodejieba, 'nodejieba in : ');

try {
  db.loadExtension('/path/to/nodejieba_extension');
  log('Nodejieba extension loaded successfully');
} catch (error) {
  log('Error loading Nodejieba extension:', error);
}

log(
  nodejieba.cut('中文Love測試分詞', true).join(' '),
  "nodejieba.cut('中文Love測試分詞').join(' ') in : ",
);

const db = require('better-sqlite3')(dbStorage, { verbose: console.log });
log(db, 'db in : better-sqlite3 connected ok');
// const db = new Database(dbStorage);
// log(db, 'db in : ');
// db.loadExtension(icu.path);

const createFts5Table = (tokenizer = 'unicode61') => {
  log('createFts5Table run');

  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS book_fts USING fts5(
      book_id UNINDEXED,
      content,
      tokenize = "${tokenizer}"
      );

      CREATE TRIGGER IF NOT EXISTS books_after_insert
      AFTER INSERT ON books
      BEGIN
      INSERT INTO book_fts (book_id, content)
      VALUES (NEW.id, NEW.content);
      END;

      CREATE TRIGGER IF NOT EXISTS books_after_update
      AFTER UPDATE ON books
      BEGIN
      UPDATE book_fts SET content = NEW.content WHERE book_id = NEW.id;
      END;

      CREATE TRIGGER IF NOT EXISTS books_after_delete
      AFTER DELETE ON books
      BEGIN
      DELETE FROM book_fts WHERE book_id = OLD.id;
      END;
      `);

  log('createFts5Table run doen');
};

const dropFts5Table = () => {
  log('dropFts5Table run');

  db.exec(`
    DROP TABLE IF EXISTS book_fts;
  `);
};

function segmentText(text) {
  // 使用 Jieba 分詞，也可以選擇其他分詞器
  // log(nodejieba.cut(text).join(' '), "nodejieba.cut(text).join(' ') in : ");
  return nodejieba.cut(text, true).join(' ');
}

function deleteAllBooksFTS() {
  db.exec('DELETE FROM book_fts');
}

function insertBookFTS(bookId, content) {
  log(bookId, 'bookId in insertBookFTS: ');
  const segmentedContent = segmentText(content);
  // log(segmentedContent, 'segmentedContent in : ');
  const insert = db.prepare(
    'INSERT INTO book_fts (book_id, content) VALUES (@bookId, @content)',
  );
  insert.run({ bookId, content });
}

function updateBookFTS(bookId, content) {
  const segmentedContent = segmentText(content);
  db.exec('UPDATE book_fts SET content = ? WHERE book_id = ?', [
    segmentedContent,
    bookId,
  ]);
}

function deleteBookFTS(bookId) {
  log(bookId, 'bookId in deleteBookFTS: ');
  db.exec('DELETE FROM book_fts WHERE book_id = ?', [bookId]);
}

function searchBooksFTS(query) {
  log(query, 'query in searchBooksFTS: ');
  if (!query) return false;
  const segmentedQuery = segmentText(query);
  const rows = db
    .prepare(
      `
        SELECT books.*
        FROM books
        JOIN book_fts ON books.id = book_fts.book_id
        WHERE book_fts MATCH ?
    `,
    )
    .all(segmentedQuery);

  let highlights = db
    .prepare(
      `
      select snippet(book_fts, 1, '<b>', '</b>', '...', 20) as highlight
      from book_fts
      where book_fts match ?
      `,
    )
    .all(segmentedQuery);
  log(highlights, 'highlights in : ');
  // log(highlights[0].highlight, 'highlights[0].highlight in : ');
  highlights = highlights.map((item, i) => stripTags(item.highlight));
  log(highlights, 'highlights in : ');
  return { rows, highlights };
}

module.exports = {
  createFts5Table,
  searchBooksFTS,
  insertBookFTS,
  updateBookFTS,
  deleteBookFTS,
  deleteAllBooksFTS,
  dropFts5Table,
};
