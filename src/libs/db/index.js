const { log } = require('../lib');
const { createDatabase } = require('./createDatabase');
try {
  log('ceateDatabase running..');
  createDatabase();
} catch (error) {
  log(error, 'error in createDatabase: ');
  console.error('Issue with create database:', error);
}
