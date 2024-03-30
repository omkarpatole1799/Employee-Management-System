const fs = require("fs")
const fsPromises = fs.promises
const path = require("path")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const Sequelize = require("sequelize")
dotenv.config()

const sequelize = require("../utils/database")
const UserModel = require("../models/user")
const {
	ADMIN,
	EMPLOYEE,
	PROFILE_IMG_PATH,
	PNG,
	JPEG,
	JPG
} = require("../utils/constants")
const {
	E_EMAIL_EXSIST,
	E_MISSING_PROFILE_IMG,
	S_CREATE_USER,
	E_INVALID_USERNAME,
	E_INVALID_EMP_TYPE,
	E_INVALID_PASS,
	E_SIGN_UP,
	E_FILE_TYPE_NOT_ALLOWED
} = require("../utils/statusMessages.js")
const { throwError } = require("../utils/help.js")

exports.addUser = async (req, res, next) => {
	try {
		const { userName, emailId, password, employeeType } = req.body

		let userNameRegEx = new RegExp(/^[a-zA-Z0-9]{2,}$/g)

		let isUserNameValid = userNameRegEx.test(userName)

		if (!isUserNameValid) throwError(E_INVALID_USERNAME, 400)

		if (+employeeType !== ADMIN && +employeeType !== EMPLOYEE) {
			throwError(E_INVALID_EMP_TYPE, 400)
		}

		let passwordRegEx = new RegExp(/^[a-zA-Z0-9@#%&!]{8,}$/g)
		let isPasswordValid = passwordRegEx.test(password)
		if (!isPasswordValid) throwError(E_INVALID_PASS, 400)

		let user = await UserModel.findOne({
			where: { userEmail: emailId }
		})

		if (user) {
			throwError(E_EMAIL_EXSIST, 409)
		}

		const profileImg = req.files?.profileImg
		if (!profileImg) {
			res.status(400)
			throwError(E_MISSING_PROFILE_IMG, 400)
		}

		let fileExt = getFileExtension(profileImg.name)
		if (fileExt !== PNG || fileExt !== JPEG || fileExt !== JPG)
			throwError(E_FILE_TYPE_NOT_ALLOWED, 415)

		let hashedPassword = await hashPassword(password)

		let _createdUser = await UserModel.create({
			userName,
			userEmail: emailId,
			password: hashedPassword,
			userType: employeeType === ADMIN ? ADMIN : EMPLOYEE, // 1 for admin user and 2 for employee user
			profilePicture: ""
		})
		console.log(_createdUser.get({ plain: true }), "cuser")
		if (!_createdUser) {
			throwError(E_SIGN_UP, 424)
		}

		let profileImgName = await saveProfileImage(profileImg, _createdUser.id)

		_createdUser.profilePicture = profileImgName

		await _createdUser.save()

		return res.status(201).json({
			message: S_CREATE_USER
		})
	} catch (error) {
		next(error)
	}
}

async function hashPassword(password) {
	return await bcrypt.hash(password, 12)
}

async function saveProfileImage(profileImg, userId) {
	let path = PROFILE_IMG_PATH
	if (!checkPathExsists(path)) {
		await fsPromises.mkdir(path, { recursive: true })
	}

	let profileImgName = `${userId}.${getFileExtension(profileImg.name)}`

	await moveFile(path, profileImgName, profileImg)

	return profileImgName
}

function moveFile(path, fileName, file) {
	return new Promise((resolve, reject) => {
		file.mv(`${path}/${fileName}`, err => {
			err ? reject(err) : resolve(true)
		})
	})
}

function getFileExtension(fileName) {
	return fileName.split(".").pop()
}

function checkPathExsists(path) {
	return fs.existsSync(path)
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
