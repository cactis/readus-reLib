const sqlite3 = require('sqlite3').verbose();

const { Sequelize } = require('sequelize');
const { log, env } = require('../lib');
const path = require('path');

function getDataPath() {
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

const dbStorage = getDataPath() + `/database-${env}.sqlite`;
const coversPath = getDataPath() + `/covers-${env}`;
log(dbStorage, 'dbStorage in');
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
  storage: dbStorage,
  define: {
    freezeTableName: true,
  },
  // models: [Book],
});

log('sequelize connected ok');

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
module.exports.getDataPath = getDataPath;
module.exports.dbStorage = dbStorage;
module.exports.coversPath = coversPath;
module.exports.sequelize = sequelize; //Configured sequelize module. Passed to specific models.
module.exports.authenticatedConnection = authenticatedConnection;
