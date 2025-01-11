const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database'); //Bring configured db into model for init

class Message extends Model {
  getTimeStampedMessage() {
    return [this.createdAt, this.message].join(' : ');
  }
}
Message.init(
  {
    username: DataTypes.TEXT,
    message: DataTypes.TEXT,
  },
  { sequelize },
);

module.exports.Message = Message;
