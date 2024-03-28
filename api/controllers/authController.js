const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserModel = require("../models/user")
const {
	EMAIL_NOT_MATCH,
	PASS_NOT_MATCH,
	EMAIL_MISSING,
	PASS_MISSING,
	EMAIL_EXSIST
} = require("../utils/statusMessages")

exports.postUserLogin = async function (req, res) {
	const { userEmail, pass: enteredPassword } = req.body

	try {
		if (!userEmail || userEmail == "") {
			let error = new Error(EMAIL_MISSING)
			error.status = 400

		}

		if (!enteredPassword || enteredPassword == "") {
			res.status(400)
			throw new Error(PASS_MISSING)
		}

		let user = await UserModel.findOne({
			where: {
				userEmail
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
			// res.status(404)
			throw new Error(EMAIL_NOT_MATCH)
		}
		console.log(user, "==user")
		let isMatch = bcrypt.compare(enteredPassword, user.userPassword)
		if (!isMatch) {
			res.status(401)
			let err = new Error()
			err.message = PASS_NOT_MATCH
			err.status = 401
		}

		let token = await jwt.sign(
			{
				userEmail,
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
		console.log(error.status)
		return res.json({
			status: error.status,
			error: error.message,
			stack: error.stack
		})
	}
}
