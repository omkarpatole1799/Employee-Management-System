const Sequelize = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

const sequelize = new Sequelize(
	`${process.env.DB_NAME}`,
	`${process.env.DB_USER_ID}`,
	`${process.env.DB_PASS}`,
	{
		host: `${process.env.DB_HOST}`,
		dialect: "mysql",
		freezeTableName: true
	}
)

module.exports = sequelize
