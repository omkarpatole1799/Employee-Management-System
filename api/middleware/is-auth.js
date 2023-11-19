const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isAuth = (req, res, next) => {
  console.log('isAuth');
  const authHeader = req.get('Authorization');
  let decodedTocken;
  if (authHeader) {
    let tocken = authHeader.split(' ')[1];
    let userId = authHeader.split(' ')[2];
    if (tocken === null && userId === null) {
      return res.status(401).json({
        call: 0
      });
    }
    decodedTocken = jwt.verify(
      tocken,
      `${process.env.JWT_SECRET}`,
      function (err, response) {
        if (err) {
          return res.status(401).json({
            call: 0
          });
        } else {
          req.userId = userId;
          next();
        }
      }
    );
  } else {
    return res.status(401).json({
      call: 0
    });
  }
};
module.exports = isAuth;
