const { log } = require('../lib');
const Database = require('better-sqlite3');
const path = require('path');
const { dbStorage } = require('./database');
log(Database, 'Database in : ');

// const dbPath =
//   process.env.NODE_ENV === 'development_'
//     ? './database.sqlite'
//     : path.join(process.resourcesPath, './Database.sqlite');
// log(dbPath, 'dbPath in : ');
// const db = require('better-sqlite3')('./database.sqlite', {});
// log(db, 'db in -----: ');

// const icu = require('@sqlite.org/icu');
// const nodejieba = require('nodejieba'); // 使用 jieba 作為自訂分詞

// const db = new Database(dbStorage);
// log(db, 'db in : ');
// // db.loadExtension(icu.path);
// const createFts5Table = () => {
//   log('createFts5Table run');

//   db.exec(`
//     CREATE VIRTUAL TABLE IF NOT EXISTS book_fts USING fts5(
//       book_id UNINDEXED,
//       content,
//       tokenize = "nodejieba"
//       );

//       CREATE TRIGGER IF NOT EXISTS books_after_insert
//       AFTER INSERT ON books
//       BEGIN
//       INSERT INTO book_fts (book_id, content)
//       VALUES (NEW.id, NEW.content);
//       END;

//       CREATE TRIGGER IF NOT EXISTS books_after_update
//       AFTER UPDATE ON books
//       BEGIN
//       UPDATE book_fts SET content = NEW.content WHERE book_id = NEW.id;
//       END;

//       CREATE TRIGGER IF NOT EXISTS books_after_delete
//       AFTER DELETE ON books
//       BEGIN
//       DELETE FROM book_fts WHERE book_id = OLD.id;
//       END;
//       `);
// };

// function segmentText(text) {
//   // 使用 Jieba 分詞，也可以選擇其他分詞器
//   return nodejieba.cut(text).join(' ');
// }

// function insertBookFTS(bookId, content) {
//   // 使用 Jieba 分詞，也可以選擇其他分詞器
//   const segmentedContent = segmentText(content);
//   db.run('INSERT INTO book_fts (book_id, content) VALUES (?, ?)', [
//     bookId,
//     segmentedContent,
//   ]);
// }

// function updateBookFTS(bookId, content) {
//   // 使用 Jieba 分詞，也可以選擇其他分詞器
//   const segmentedContent = segmentText(content);
//   db.run('UPDATE book_fts SET content = ? WHERE book_id = ?', [
//     segmentedContent,
//     bookId,
//   ]);
// }

// function deleteBookFTS(bookId) {
//   db.run('DELETE FROM book_fts WHERE book_id = ?', [bookId]);
// }

// function searchBooksFTS(query) {
//   const segmentedQuery = segmentText(query);
//   const rows = db
//     .prepare(
//       `
//         SELECT books.*
//         FROM books
//         JOIN book_fts ON books.id = book_fts.book_id
//         WHERE book_fts MATCH ?
//     `,
//     )
//     .all(segmentedQuery);
//   return rows;
// }

// module.exports = {
//   createFts5Table,
//   searchBooksFTS,
//   insertBookFTS,
//   updateBookFTS,
//   deleteBookFTS,
// };
