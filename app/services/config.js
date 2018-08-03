const db = require("./db");

exports.getConfig = async function(user) {
  return db.retrieveConfig(user);
};

exports.setConfig = async function(user, slotLength, activities) {
  db.storeConfig({
    slotLength,
    activities
  }, user);
};