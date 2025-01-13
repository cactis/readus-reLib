const sqlite3 = require('sqlite3').verbose();

const { Sequelize } = require('sequelize');
const { log } = require('../lib');
const path = require('path');
// console.log(app, 'app in : ');

// const { app } = require('electron');
// console.log(app.getPath('userData'));

function getAppDataPath() {
  switch (process.platform) {
    case 'darwin': {
      return path.join(
        process.env.HOME,
        'Library',
        'Application Support',
        'Readus-reLib',
      );
    }
    case 'win32': {
      return path.join(process.env.APPDATA, 'Readus-reLib');
    }
    case 'linux': {
      return path.join(process.env.HOME, '.Readus-reLib');
    }
    default: {
      console.log('Unsupported platform!');
      process.exit(1);
    }
  }
}

// const dataPath = app.getPath('userData');
// const dbPath =
//   process.env.NODE_ENV === 'development'
//     ? './database.sqlite'
//     : path.join(process.resourcesPath, './Database.sqlite');
// log(dbPath, 'dbPath');
const dbPath = getAppDataPath() + '/database.sqlite';
log(dbPath, 'dbPath in : ');
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
  storage: dbPath,
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
