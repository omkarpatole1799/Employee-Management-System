const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const UserLog = sequelize.define("UserLog", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    logInfo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    projectTitle: {
        type: Sequelize.STRING, 
        allowNull: false, 
    }
});

module.exports = UserLog;
