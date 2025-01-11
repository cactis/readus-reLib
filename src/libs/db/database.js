/*
  The purpose of this class is to create our connection string and authenticate to database prior to running and db creation or model creation.
*/
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite:../storage/relib.db'); //Export this connection to our main and ipcRenderer, export models from index.js in the models folder

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
