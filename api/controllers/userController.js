const UserLog = require("../models/user_log")
const projectList = require("../models/project_list")
const { tryCatch, sendSuccess } = require("../utils/help")
const AppError = require("../utils/AppError")

// exports.postLogData = async (req, res, next) => {
//   const { logDescription: log, projectName: projectTitle } = req.body
//   const userId = req.userId

//   console.log(userId, 'uid')

//   try {
//     const createLog = await UserLog.create({
//       logInfo: log,
//       projectTitle,
//       UserId: userId
//     }, {raw: true})

//     console.log(createLog, 'clog')

//     res.status(201).json({
//       success: true,
//       message: "Successfully added log",
//       data: {}
//     })
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// }

exports.postLogData = tryCatch(async (req, res) => {
  const { logDescription: log, projectName: projectTitle } = req.body
  if (log == "" || !log || !projectTitle || projectTitle == "") {
    throw new AppError("Either log description or project title missing.", 400)
  }

  const userId = req.userId
  if (!userId) throw new AppError("Unauthorized", 401)

  const createLog = await UserLog.create(
    {
      logInfo: log,
      projectTitle,
      UserId: userId
    },
    { raw: true }
  )
  sendSuccess(res, { message: "Add log successful", status: 201 })
})

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
