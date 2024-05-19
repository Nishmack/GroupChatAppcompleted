const Sequelize = require("sequelize");

const sequelize = new Sequelize("chatapp", "root", "nishma@99", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
