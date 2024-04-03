const UserLog = require("../models/user_log")
const projectList = require("../models/project_list")

exports.postLogData = async (req, res, next) => {
	console.log(req.body, '-------------')

	return;
	const { log, projectTitle } = req.body
	const userId = req.userId

	try {
		const createLog = await UserLog.create({
			logInfo: log,
			projectTitle,
			UserId: userId
		})
		res.status(201).json({
			message: "successfully added log",
			status: 201
		})
	} catch (error) {
		console.log(error)
		next(error)
	}
}

// getting user log list
exports.getLogList = function (req, res) {
	const userId = req.userId
	UserLog.findAll({
		attributes: ["logInfo", "projectTitle", "createdAt"],
		where: {
			userId: Number(userId)
		},
		raw: true
	})
		.then(result => {
			return res.status(200).send({
				call: 1,
				data: result
			})
		})
		.catch(err => {
			return res.status(500).send({
				call: 0,
				data: err
			})
		})
}

exports.postProjectName = async function (req, res) {
	console.log(req.body, "p name")
	let { projectName } = req.body

	let response = await projectList.create(
		{
			projectName
		},
		{ raw: true }
	)

	console.log(response, "response")

	// projectList
	//   .create({
	//     projectName,
	//     next,
	//     raw: true
	//   })
	//   .then((result) => {
	//     return res.status(201).json({
	//       call: 1
	//     });
	//   })
	//   .catch((err) => {
	//     return res.status(500).json({
	//       call: 0,
	//       data: err
	//     });
	//   });
}
