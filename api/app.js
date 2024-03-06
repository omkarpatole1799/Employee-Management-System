// packages import
const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

// files import
const indexRoutes = require("./Routes/indexRoutes")
const sequelize = require("./Utils/database")

// sequelize models import
const user = require("./Model/user")
const user_log = require("./Model/user_log")
const attendance = require("./Model/attendance")
const project_list = require("./Model/project_list")

const app = express()

// middlewares
//cors
app.use(cors())
app.use(fileUpload())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", indexRoutes)
app.use(function (req, res) {
	res.status(404).send({
		message: "Route Not found",
		status: 404
	})
})

// sequelize associations
user_log.belongsTo(user, {
	constraints: true,
	onDelete: "CASCADE"
})
user.hasMany(user_log)

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
		console.log(_user,'---')
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
