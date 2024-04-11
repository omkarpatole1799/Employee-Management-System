const Sequelize = require("sequelize")

const sequelize = require("../utils/database")

const user = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userName: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  userType: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  profilePicture: {
    type: Sequelize.STRING(255)
  }
})

module.exports = user
