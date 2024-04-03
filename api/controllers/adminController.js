const fs = require("fs")
const fsPromises = fs.promises

const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const Sequelize = require("sequelize")
dotenv.config()

const UserModel = require("../models/user")
const CONSTS = require("../utils/constants")

const STATUS = require("../utils/statusMessages.js")

const { throwError } = require("../utils/help.js")

exports.addUser = async (req, res, next) => {
	try {
		console.log(req.body, "req.body")
		const { userName, emailId, password, employeeType } = req.body

		let userNameRegEx = new RegExp(/^[a-zA-Z0-9]{2,}$/g)
		let isUserNameValid = userNameRegEx.test(userName)
		if (!isUserNameValid) throwError(STATUS.E_INVALID_USERNAME, 400)

		let passwordRegEx = new RegExp(/^[\x20-\x7E]{8,}$/g)
		let isPasswordValid = passwordRegEx.test(password)
		if (!isPasswordValid) throwError(STATUS.E_INVALID_PASS, 400)

		if (+employeeType !== CONSTS.ADMIN && +employeeType !== CONSTS.EMPLOYEE) {
			throwError(STATUS.E_INVALID_EMP_TYPE, 400)
		}

		let user = await UserModel.findOne({
			where: { userEmail: emailId }
		})

		if (user) {
			throwError(STATUS.E_EMAIL_EXSIST, 409)
		}

		const profileImg = req.files?.profileImg
		if (!profileImg) {
			res.status(400)
			throwError(STATUS.E_MISSING_PROFILE_IMG, 400)
		}

		let fileType = profileImg.mimetype

		// console.log(fileType)
		// if (
		// 	fileType != CONSTS.PNG ||
		// 	fileType != CONSTS.JPEG ||
		// 	fileType != CONSTS.JPG
		// ) {
		// 	throwError(STATUS.E_FILE_TYPE_NOT_ALLOWED, 415)
		// }

		let hashedPassword = await hashPassword(password)

		let _createdUser = await UserModel.create({
			userName,
			userEmail: emailId,
			password: hashedPassword,
			userType: employeeType === CONSTS.ADMIN ? CONSTS.ADMIN : CONSTS.EMPLOYEE,
			profilePicture: ""
		})

		if (!_createdUser) {
			throwError(STATUS.E_SIGN_UP, 424)
		}

		let profileImgName = await saveProfileImage(profileImg, _createdUser.id)

		_createdUser.profilePicture = profileImgName

		await _createdUser.save()

		return res.status(201).json({
			success: true,
			message: STATUS.S_CREATE_USER
		})
	} catch (error) {
		next(error)
	}
}

async function hashPassword(password) {
	return await bcrypt.hash(password, 12)
}

async function saveProfileImage(profileImg, userId) {
	let path = CONSTS.PROFILE_IMG_PATH

	if (!fs.existsSync(path)) {
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

// ********************************************
// GET EMPLOYEE COUNT
// ********************************************

exports.getEmployeeCount = async (req, res, next) => {
	try {
		let response = await UserModel.findAll({
			attributes: [
				[Sequelize.fn("COUNT", Sequelize.col("id")), "total_employees"]
			],
			raw: true
		})

		console.log(response)

		res.status(200).json({
			code: 200,
			status: "success",
			data: {
				employeeCount: response[0]
			}
		})
	} catch (error) {
		next(error)
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
			status: "success",
			data: employeeList
		})
	} catch (error) {
		next(error)
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
