// packages import
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// files import
const indexRoutes = require('./Routes/indexRoutes');
const sequelize = require('./Utils/database');

// sequelize models import
const User = require('./Model/userModel');
const UserLog = require('./Model/logDataModel');
const attendance = require('./Model/attendanceModel');
const app = express();

// middlewares
//cors
app.use(cors());

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    let profileImageName = `profileImage-${
      req.body.email.split('@')[0]
    }`;
    cb(null, profileImageName + '-' + file.originalname);
  }
});

app.use(multer({ storage: storage }).single('profileImage'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRoutes);
app.use(function (req, res) {
  res.status(404).send({
    message: 'Route Not found',
    status: 404
  });
});

// sequelize associations
UserLog.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(UserLog);

sequelize
  // .sync({ force: true })
  // .sync({ alter: true })
  .sync()
  .then(()=>{
    User.create({
      userName: '1',
      userEmail: '1',
      password: '$2a$12$5Knuj8XPp16JoQExKJbU5Or2AI75bZ3TizXKDo5HxLWedWogjvfMe',
      userType: 1
    })
  })
  .then((result) => {
    app.listen(`${process.env.PORT}`, () => {
      console.log('app running on port', process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
