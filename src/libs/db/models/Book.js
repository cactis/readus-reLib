const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database'); //Bring configured db into model for init
const { Database } = require('sqlite3');
class Book extends Model {
  // static upperCaseFirstName() {
  //   return this.firstname.toUpperCase();
  // }
  async build(attrs) {
    try {
      const book = await Book.create(attrs);
      return await book.save();
    } catch (e) {
      const topLevelError = e.errors[0];
      console.log(
        `Issue creating book {Message: ${topLevelError.message}, Type: ${topLevelError.type}, Value: ${topLevelError.value} already exists}`,
      );
    }
    return null;
  }
}

Book.init(
  {
    sha256: {
      type: DataTypes.TEXT,
      unique: false,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
    },
    cover: Database.TEXT,
    author: DataTypes.TEXT,
    language: DataTypes.TEXT,
    publisher: DataTypes.TEXT,
    url: DataTypes.ARRAY,
    date: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
  },
  { sequelize },
);

module.exports.Book = Book;
