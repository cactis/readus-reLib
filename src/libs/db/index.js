const { log } = require('../lib');
const { createDatabase } = require('./createDatabase');
const { createFts5Table } = require('./createFTS5');

try {
  log('ceateDatabase running..');
  createDatabase();
  // createFts5Table();
} catch (error) {
  log(error, 'error in createDatabase: ');
  console.error('Issue with create database:', error);
}
