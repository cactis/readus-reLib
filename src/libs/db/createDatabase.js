const { log } = require('../lib');
const { sequelize, authenticatedConnection } = require('./database');

async function createDatabase() {
  try {
    let authed = await authenticatedConnection(); //Authorize our db connection and then create models.
    log(authed, 'authed in createDatabase: ');
    if (authed) {
      require('./models');
      // await sequelize.sync({ force: true });
      await sequelize.sync({ alter: true });
    }
  } catch (e) {
    console.log(`Error in createModels: ${e}`);
  }
}
module.exports.createDatabase = createDatabase;
