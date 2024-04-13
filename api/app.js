const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const indexRoutes = require("./routes/indexRoutes")

const errorHandler = require("./middlewares/error-handler")
const _404 = require("./middlewares/404")

const app = express()

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", indexRoutes)
app.use(_404)
app.use(errorHandler)

const sequelize = require("./utils/database")
const user = require("./models/user")
const user_log = require("./models/user_log")
const attendance = require("./models/attendance")
const project_list = require("./models/project_list")
// sequelize associations
user.hasMany(user_log)
user_log.belongsTo(user, {
  constraints: true,
  onDelete: "CASCADE"
})

sequelize
  // .sync({ force: true })
  // .sync({ alter: true })
  .sync()
  .then(() => {
    return user.findOne({
      where: {
        userName: "1"
      },
      attributes: ["userName"],
      raw: true
    })
  })
  .then(_user => {
    console.log(_user, "---")
    if (_user === null) {
      user.create({
        userName: "1",
        userEmail: "1",
        password:
          "$2a$12$5Knuj8XPp16JoQExKJbU5Or2AI75bZ3TizXKDo5HxLWedWogjvfMe",
        userType: 1
      })
    }
  })
  .then(() => {
    app.listen(`${process.env.PORT}`, () => {
      console.log("app running on port", process.env.PORT)
    })
  })
  .catch(err => console.log(err))
