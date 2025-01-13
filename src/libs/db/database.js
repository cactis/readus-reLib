const sqlite3 = require('sqlite3').verbose();

const { Sequelize } = require('sequelize');

// console.log(app, 'app in : ');

// const { app } = require('electron');
// console.log(app.getPath('userData'));

// const dataPath = app.getPath('userData');
const dataPath = '.';
console.log(dataPath);
// const sequelize = new Sequelize('sqlite:../storage/relib.db'); //Export this connection to our main and ipcRenderer, export models from index.js in the models folder
const sequelize = new Sequelize('database', { raw: false }, null, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectModule: sqlite3,
  dialect: 'sqlite',
  storage: `${dataPath}/database.sqlite`,
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
