const Sequelize = require("sequelize");

module.exports = global.sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  apiKey: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
