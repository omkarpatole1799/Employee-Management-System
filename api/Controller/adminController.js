const UserModel = require('../Model/userModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const sequelize = require('../Utils/database');
const Sequelize = require('sequelize');
dotenv.config();

exports.addUser = async (req, res) => {
  let {
    userName,
    userEmail,
    pass: password,
    userType
  } = req.body;
  let user = await UserModel.findOne({
    where: { userEmail }
  });

  if (user) {
    return res.status(400).json({
      message: 'Email already exsist',
      status: 400
    });
  }

  let hashedPassword = await hashPassword(password);

  await createUser(
    userName,
    userEmail,
    hashedPassword,
    userType
  );

  res.status(201).json({
    message: 'User Created successfully',
    status: 201
  });
};

async function hashPassword(password) {
  // RETURNS hashedPassword
  return await bcrypt.hash(password, 12);
}

async function createUser(
  userName,
  userEmail,
  hashedPassword,
  userType
) {
  // RETURN CREATE USER
  return (
    await UserModel.create({
      userName,
      userEmail,
      password: hashedPassword,
      userType // 1 for admin user and 2 for employee user
    })
  ).get({ plain: true });
}

// ********************************************
// GET EMPLOYEE COUNT
// ********************************************

exports.getEmployeeCount = async (req, res) => {
  console.log('getting emp count');
  try {
    let response = await UserModel.findAll({
      attributes: [
        [
          Sequelize.fn('COUNT', Sequelize.col('id')),
          'total_employees'
        ]
      ],
      raw: true
    });
    console.log(response[0], '-- total emp count --');
    res.status(200).json({
      call: 1,
      totalEmployees: response[0]
    });
  } catch (error) {
    returnError(res, error);
  }
};

// ********************************************
// COMMON FUNCTIONS
// ********************************************
function returnError(res, error) {
  return res.status(500).json({
    call: 0,
    data: error
  });
}
