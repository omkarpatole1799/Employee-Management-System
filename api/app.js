// packages import
const express = require('express');
const fileUpload = require('express-fileupload');
// const multer = require('multer');
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
const projectListModel = require('./Model/projectListModel');

const app = express();

// middlewares
//cors
app.use(cors());
app.use(fileUpload());

// multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/profile-picture');
//   },
//   filename: function (req, file, cb) {
//     let profileImageName = `profilePicture-${
//       req.body.email.split('@')[0]
//     }`;
//     cb(
//       null,
//       profileImageName + '.' + file.originalname.split('.')[1]
//     );
//   }
// });

// app.use(
//   multer({ storage: storage }).single('profilePicture')
// );
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
	.then(() => {
		return User.findOne({
			where: {
				userName: '1'
			},
			attributes: ['userName'],
			raw: true
		});
	})
	.then((user) => {
		console.log(user);
		if (user === null) {
			User.create({
				userName: '1',
				userEmail: '1',
				password:
					'$2a$12$5Knuj8XPp16JoQExKJbU5Or2AI75bZ3TizXKDo5HxLWedWogjvfMe',
				userType: 1
			});
		}
	})
	.then(() => {
		app.listen(`${process.env.PORT}`, () => {
			console.log('app running on port', process.env.PORT);
		});
	})
	.catch((err) => console.log(err));
