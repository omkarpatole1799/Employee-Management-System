const fs = require("fs")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const Sequelize = require("sequelize")
dotenv.config()

const sequelize = require("../Utils/database")
const UserModel = require("../Model/user")

function checkPathExsists(path) {
	return fs.existsSync(path)
}

function checkIfEmpty(value, name) {
	if (!value || value === undefined || value === null) {
		throw new Error(`Please add ${name}`)
	}
}

exports.addUser = async (req, res) => {
	try {
		const { userName, emailId, password, employeeType } = req.body

		checkIfEmpty(userName, "User name")
		checkIfEmpty(emailId, "Email")
		checkIfEmpty(password, "Password")
		checkIfEmpty(employeeType, "Employee Type")

		let user = await UserModel.findOne({
			where: { userEmail: emailId }
		})

		if (user) {
			res.status(409)
			throw new Error("Email already exsist")
		}

		const profileImg = req.files?.profileImg
		if (!profileImg) {
			res.status(400)
			throw new Error("Please add profile image")
		}

		let hashedPassword = await hashPassword(password)

		let profileImgPath = `./public/profile-images`
		let fileExtension = profileImg.name.split(".").pop()

		if (!checkPathExsists(profileImgPath)) {
			fs.mkdirSync(profileImgPath)
		}

		profileImg.mv(`${profileImgPath}/${userName}.${fileExtension}`, err => {
			if (err) {
				throw new Error("Error saving profile image, please try again later")
			}
		})

		await UserModel.create({
			userName,
			userEmail: emailId,
			password: hashedPassword,
			userType: employeeType === "admin" ? 1 : 0, // 1 for admin user and 2 for employee user
			profilePicture: profileImgPath
		})

		return res.status(201).json({
			message: "User Created successfully"
		})
	} catch (error) {
		return res.json({
			error: error.message
		})
	}
}

async function hashPassword(password) {
	// RETURNS hashedPassword
	return await bcrypt.hash(password, 12)
}

async function createUser(
	userName,
	userEmail,
	hashedPassword,
	userType,
	profilePicture
) {
	// RETURN CREATE USER
	return (
		await UserModel.create({
			userName,
			userEmail,
			password: hashedPassword,
			userType, // 1 for admin user and 2 for employee user
			profilePicture
		})
	).get({ plain: true })
}

// ********************************************
// GET EMPLOYEE COUNT
// ********************************************

exports.getEmployeeCount = async (req, res) => {
	try {
		let response = await UserModel.findAll({
			attributes: [
				[Sequelize.fn("COUNT", Sequelize.col("id")), "total_employees"]
			]
		})
		console.log(response)
		res.status(200).json({
			call: 1,
			totalEmployees: response[0]
		})
	} catch (error) {
		returnError(res, error)
	}
}

exports.getEmployeeList = async function (req, res, next) {
	try {
		let employeeList = await UserModel.findAll({
			attributes: [
				["userName", "empName"],
				["id", "empId"]
			],
			raw: true
		})
		return res.status(200).json({
			call: 1,
			data: employeeList
		})
	} catch (error) {
		returnError(res, error)
	}
}

exports.deleteEmployee = async function (req, res) {
	try {
		let empId = req.body.empId
		let deleteEmployee = await UserModel.destroy({
			where: {
				id: empId
			}
		})
	} catch (error) {
		returnError(res, error)
	}
}

// ********************************************
// COMMON FUNCTIONS
// ********************************************
function returnError(res, error) {
	return res.status(500).json({
		call: 0,
		data: error
	})
}
