const db = require("./db");

exports.getConfig = async function(user) {
  return db.retrieveConfig(user);
};

exports.setConfig = async function(user, slotLength, activities) {
  let result = await db.storeConfig({
    slotLength,
    activities
  }, user);

  if (result === false) {
    return 'Error: Config could not be set!';
  }
};