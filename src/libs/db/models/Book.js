const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database'); //Bring configured db into model for init

const { Database } = require('sqlite3');
const { log, decompress, compress } = require('../../lib');

class Book extends Model {
  // async build(attrs) {
  //   try {
  //     const book = await Book.create(attrs);
  //     return await book.save();
  //   } catch (e) {
  //     log(e, 'e in Book.build: ');
  //   }
  //   return null;
  // }
}

Book.init(
  {
    sha256: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
    },
    author: DataTypes.TEXT,
    cover: DataTypes.TEXT,
    date: DataTypes.TEXT,
    language: DataTypes.TEXT,
    publisher: DataTypes.TEXT,
    url: Sequelize.JSON,
    content: {
      type: Sequelize.JSON,
    },
    createdAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Books',
  },
);

module.exports.Book = Book;
