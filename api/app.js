// packages import
const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

// files import
const indexRoutes = require("./routes/indexRoutes")
const sequelize = require("./utils/database")

// sequelize models import
const user = require("./models/user")
const user_log = require("./models/user_log")
const attendance = require("./models/attendance")
const project_list = require("./models/project_list")

const app = express()

// middlewares
//cors
app.use(cors())
app.use(fileUpload())

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.use("/", indexRoutes)
app.use(function (req, res) {
	res.status(404).send({
		message: "Route Not found",
		status: 404
	})
})

app.use((error, req, res, next) => {
	if (error?.code === "ENOENT") {
		error.status = 500
		error.message = "Failed to save profile image"
	}

	if (process.env.PROJECT_ENV === "DEV") {
		res.status(error.status || 500).json({
			success: false,
			error_status: error.status || 500,
			message: error.message || "Something went wrong",
			error_stack: process.env.PROJECT_ENV === "DEV" ? error.stack : {}
		})
	} else {
		res.status(error.status || 500).json({
			success: false,
			error_status: error.status || 500,
			message: error.message || "Something went wrong"
		})
	}
})

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
