const Sequelize = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

const dbConn = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER_ID}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "mysql",
    freezeTableName: true
  }
)

try {
  await dbConn.authenticate()
  console.log("DB CONNECTION SUCCESS")
} catch (error) {
  console.log("DB DONNECTION ERROR", error)
}

module.exports = dbConn
