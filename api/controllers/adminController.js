const fs = require("fs")
const fsPromises = fs.promises
const path = require("path")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const Sequelize = require("sequelize")
dotenv.config()

const sequelize = require("../utils/database")
const UserModel = require("../models/user")
const { ADMIN, EMPLOYEE } = require("../utils/constants")
const {
	EMAIL_EXSIST,
	MISSING_PROFILE_IMG,
	SUCCESS_CREATE_USER,
	INVALID_USERNAME
} = require("../utils/statusMessages")

function checkPathExsists(path) {
	return fs.existsSync(path)
}

function checkIfEmpty(value, name) {
	if (!value || value === undefined || value === null) {
		throw new Error(`Please add ${name}`)
	}
}

exports.addUser = async (req, res, next) => {
	try {
		const { userName, emailId, password, employeeType } = req.body

		// let userNameRegEx = new RegExp(/^[a-zA-Z]|[a-zA-Z]$|[a-zA-Z]/g)
		// let userNameRegEx = new RegExp(/^[a-z]|[a-z]$|[a-z]|[A-Z]|^[A-Z]|[A-Z]$/g)
		let userNameRegEx = new RegExp(/[^a-zA-Z0-9]/g)
		console.log(userNameRegEx.test(userName.trim()))
		if (userNameRegEx.test(userName.trim())) {
			throw new Error(INVALID_USERNAME)
		} else {
			console.log("here")
		}
		return

		let passwordRegEx = new RegExp(/^[a-z]|^[A-Z]|^[0-9]/i)

		checkIfEmpty(emailId, "Email")
		checkIfEmpty(password, "Password")
		checkIfEmpty(employeeType, "Employee Type")

		let user = await UserModel.findOne({
			where: { userEmail: emailId }
		})

		if (user) {
			res.status(409)
			throw new Error(EMAIL_EXSIST)
		}

		const profileImg = req.files?.profileImg
		if (!profileImg) {
			res.status(400)
			throw new Error(MISSING_PROFILE_IMG)
		}

		let hashedPassword = await hashPassword(password)

		let profileImgPath = `./public/profile-images`
		let fileExtension = profileImg.name.split(".").pop()

		if (!checkPathExsists(profileImgPath)) {
			await fsPromises.mkdir(profileImgPath, { recursive: true })
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
			userType: employeeType === "admin" ? ADMIN : EMPLOYEE, // 1 for admin user and 2 for employee user
			profilePicture: profileImgPath
		})

		return res.status(201).json({
			message: SUCCESS_CREATE_USER
		})
	} catch (error) {
		return res.json({
			status: res.status,
			message: error.message
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
		if (!empId) {
			throw new Error("Please mention employee ID")
		}

		let emp = await UserModel.findOne({
			where: {
				id: empId
			},
			raw: true
		})
		console.log(emp, "-emp")

		if (!emp) {
			throw new Error("Wrong employee ID")
		}

		let deleteEmployee = await UserModel.destroy({
			where: {
				id: empId
			}
		})

		console.log(deleteEmployee, "-demp")
		if (deleteEmployee === 1) {
			return res.status(200).json({
				message: `Employee deleted successfully. Emp ID - ${empId}`
			})
		}
	} catch (error) {
		returnError(res, error)
	}
}

// ********************************************
// COMMON FUNCTIONS
// ********************************************
function returnError(res, error) {
	return res.json({
		error: error.message
	})
}
