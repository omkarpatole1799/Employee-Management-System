const sequelize = require('../Utils/database');
const { INTEGER, STRING } = require('sequelize');

const projectListModel = sequelize.define(
	'projectListModel',
	{
		id: {
			type: INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		projectName: {
			type: STRING,
			allowNull: false
		}
	},
	{ createdAt: false, updatedAt: false }
);

module.exports = projectListModel;
