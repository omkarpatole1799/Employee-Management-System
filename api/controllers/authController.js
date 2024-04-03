const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserModel = require("../models/user")
const STATUS = require("../utils/statusMessages.js")
const { throwError } = require("../utils/help.js")

exports.postUserLogin = async function (req, res, next) {
	const { email, password } = req.body

	try {
		if (!email || email == "" || !password || password == "") {
			throwError(STATUS.E_INVALID_CREDENTIALS, 403)
		}

		let user = await UserModel.findOne({
			where: {
				userEmail: email
			},
			attributes: [
				["userName", "userName"],
				["userEmail", "userEmail"],
				["password", "userPassword"],
				["userType", "userType"],
				["profilePicture", "userProfile"]
			],
			raw: true
		})

		if (user === null || user === undefined) {
			throwError(STATUS.E_INVALID_CREDENTIALS, 403)
		}

		let isMatch = await bcrypt.compare(password, user.userPassword)

		if (!isMatch) {
			throwError(STATUS.E_INVALID_CREDENTIALS, 403)
		}

		let token = await jwt.sign(
			{
				userEmail: email,
				userId: user.id
			},
			`${process.env.JWT_SECRET}`,
			{ expiresIn: "10h" }
		)

		res.status(200).json({
			message: "authenticated",
			token,
			userId: user.id,
			userName: user.userName,
			userType: user.userType
		})
	} catch (error) {
		next(error)
	}
}
