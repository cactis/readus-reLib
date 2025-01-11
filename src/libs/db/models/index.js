//All we have to do now is require index.js to get all our required models for working with the db.

module.exports = {
  Book: require('./Book').Book,
};
