const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const user_log = sequelize.define("user_log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  logInfo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectTitle: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = user_log
