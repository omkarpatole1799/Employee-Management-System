// adding user logs
const sequelize = require('sequelize');
const UserLog = require('../Model/logDataModel');

exports.postLogData = async (req, res) => {
  const { log, projectTitle } = req.body;
  const userId = req.userId;

  try {
    const createLog = await UserLog.create({
      logInfo: log,
      projectTitle,
      UserId: userId
    });
    res.status(201).json({
      message: 'successfully added log',
      status: 201
    });
  } catch (error) {
    console.log(error);
  }
};

// getting user log list
exports.getLogList = function (req, res) {
  const userId = req.userId;
  UserLog.findAll({
    attributes: ['logInfo', 'projectTitle', 'createdAt'],
    where: {
      userId: Number(userId)
    },
    raw: true
  })
    .then((result) => {
      return res.status(200).send({
        call: 1,
        data: result
      });
    })
    .catch((err) => {
      return res.status(500).send({
        call: 0,
        data: err
      });
    });
};
