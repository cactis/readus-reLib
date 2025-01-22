const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database');
const { Book } = require('./Book');
const { BiLogoBootstrap } = require('react-icons/bi');
const { log } = require('../../lib');

class Note extends Model {}

Note.init(
  {
    title: {
      type: DataTypes.TEXT,
    },
    json: {
      type: Sequelize.JSON,
    },
  },
  { sequelize, modelName: 'Notes' },
);

Book.hasMany(Note, { foreignKey: 'book_id' });
Note.belongsTo(Book);

module.exports.Note = Note;

// Note.findOne().then((book) => {
//   book.notes();
// });
