/*
  The purpose of this class is to create our connection string and authenticate to database prior to running and db creation or model creation.
*/
const sqlite3 = require('sqlite3').verbose();
const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('sqlite:../storage/relib.db'); //Export this connection to our main and ipcRenderer, export models from index.js in the models folder
const sequelize = new Sequelize('database', null, null, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // 手动配置sqlite3，默认的不会被识别
  dialectModule: sqlite3,
  dialect: 'sqlite',
  storage: './database.sqlite',
});

async function authenticatedConnection() {
  let authenticated = false;
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    authenticated = true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return authenticated;
}

module.exports.sequelize = sequelize; //Configured sequelize module. Passed to specific models.
module.exports.authenticatedConnection = authenticatedConnection;
