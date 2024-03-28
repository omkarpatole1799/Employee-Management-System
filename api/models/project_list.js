const sequelize = require('../utils/database');
const { INTEGER, STRING } = require('sequelize');

const project_list = sequelize.define(
	'project_list',
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

module.exports = project_list;
