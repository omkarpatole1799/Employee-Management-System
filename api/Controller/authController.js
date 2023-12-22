const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../Model/userModel');

exports.postUserLogin = async function (req, res) {
  const { userEmail, pass: enteredPassword } = req.body;
  console.log(req.body, 'in api');
  console.log(req.body);
  UserModel.findOne({
    where: {
      userEmail
    }
  }).then((user) => {
    if (user !== null) {
      const { id, userName, password, userType } =
        user.dataValues;
      if (userName) {
        bcrypt
          .compare(enteredPassword, password)
          .then((comparedPassword) => {
            if (comparedPassword) {
              const tocken = jwt.sign(
                {
                  userEmail,
                  userId: id
                },
                `${process.env.JWT_SECRET}`,
                { expiresIn: '10h' }
              );

              res.status(200).json({
                message: 'authenticated',
                tocken,
                userId: id,
                userName,
                userType
              });
            } else {
              res.status(401).json({
                message: 'Incorret Password'
              });
            }
          });
      }
    } else {
      res.status(401).json({
        message: 'Incorrect Email'
      });
    }
  });
};
