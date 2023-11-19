const Sequelize = require('sequelize')
const sequelize = require('../Utils/database')

const attendance = sequelize.define(
    'attendance',
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        inTime: {
            type: Sequelize.DATE,
        },
        outTime: {
            type: Sequelize.DATE,
        },
    },
    {
        createdAt: false,
        modifiedAt: false,
    }
)

module.exports = attendance
