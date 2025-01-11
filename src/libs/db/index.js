const { createDatabase } = require('./createDatabase');
try {
  createDatabase();
} catch (error) {
  console.error('Issue with create database:', error);
}
