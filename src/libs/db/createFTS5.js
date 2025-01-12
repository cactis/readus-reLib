const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`
    CREATE VIRTUAL TABLE IF NOT EXISTS book_fts USING fts5(
      book_id UNINDEXED,
      content,
      tokenize = "nodejieba"
      );
      `);

  // "unicode61"
  // 建立觸發器，當 books 資料變動時自動更新 FTS 表格
  db.run(`
    CREATE TRIGGER IF NOT EXISTS books_after_insert
    AFTER INSERT ON books
    BEGIN
      INSERT INTO book_fts (book_id, content)
      VALUES (NEW.id, NEW.content);
    END;
  `);

  db.run(`
    CREATE TRIGGER IF NOT EXISTS books_after_update
    AFTER UPDATE ON books
    BEGIN
      UPDATE book_fts SET content = NEW.content WHERE book_id = NEW.id;
    END;
  `);

  db.run(`
    CREATE TRIGGER IF NOT EXISTS books_after_delete
    AFTER DELETE ON books
    BEGIN
      DELETE FROM book_fts WHERE book_id = OLD.id;
    END;
  `);
});
