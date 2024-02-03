const fs = require("fs")
const UserModel = require("../Model/userModel")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const sequelize = require("../Utils/database")
const Sequelize = require("sequelize")
dotenv.config()
function checkPathExsists(path) {
	return fs.existsSync(path)
}
exports.addUser = async (req, res) => {
	const profileImg = req.files?.profileImg

	const { userName, emailId, password, employeeType } = req.body

	if (profileImg === undefined) {
		return res.status(400).json({
			message: "Please add profile image"
		})
	}

	let profileImgPath = "./public/profile-images"
	let fileExtension = profileImg.name.split(".").pop()
	if (!checkPathExsists(profileImgPath)) {
		fs.mkdirSync(profileImgPath)
	}
	profileImg.mv(`${profileImgPath}/${userName}.${fileExtension}`, (err) => {
		if (err) {
			return res.status(500).json({
				message: "Error saving profile image, please try again later"
			})
		}
	})

	let user = await UserModel.findOne({
		where: { userEmail: emailId }
	})

	if (user) {
		return res.status(409).json({
			message: "Email already exsist"
		})
	}

	let hashedPassword = await hashPassword(password)

	try {
		await UserModel.create({
			userName,
			userEmail: emailId,
			password: hashedPassword,
			userType: employeeType === "admin" ? 1 : 0, // 1 for admin user and 2 for employee user
			profilePicture: profileImgPath
		})
		res.status(201).json({
			message: "User Created successfully"
		})
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong while adding details, try again later"
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
