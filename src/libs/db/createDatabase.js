const { sequelize, authenticatedConnection } = require('./database');

async function createDatabase() {
  try {
    authed = await authenticatedConnection(); //Authorize our db connection and then create models.
    if (authed) {
      require('./models');
      await sequelize.sync();
    }
  } catch (e) {
    console.log(`Error in createModels: ${e}`);
  }
}
module.exports.createDatabase = createDatabase;
