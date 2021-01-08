const jwt = require("jsonwebtoken");
const moment = require("moment");
const crypto = require("crypto");
const sendgridMail = require("@sendgrid/mail");

const { successReg, resetPass } = require("../emails/auth-emails");
const User = require("../models/user-model");
const generateToken = require("../utils/generateToken");
const { unlink } = require("fs");

//*********************************/
//************* ADMIN *************/
//*********************************/

//* @desc  Get all users
//* @route  GET /api/users
//* @access  Private/Admin
const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (error) {
		res.status(404).json({ message: "usersNotFound" });
		console.log(error);
	}
};

//* @desc  Delete user
//* @route  DELETE /api/users/:id
//* @access  Private/Admin
const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			await user.remove();
			res.json({ message: "User removed" });
		} else {
			return res.status(404).json({ message: "[BACKEND] User not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "[BACKEND] User not found" });
		console.log(error);
	}
};

//*********************************/
//************* CLIENT ************/
//*********************************/

//* @desc  Auth user & get token
//* @route  POST /api/users/login
//* @access  Public
const authUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		//* get expiration time
		const token = generateToken(user._id);
		const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
		//const expToken = decoded.exp - decoded.iat;
		const expToken = decoded.exp;

		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				image: user.image,
				created: user.created,
				token,
				expToken,
			});
		} else {
			return res.status(401).json({ message: "invalid email or password" });
		}
	} catch (error) {
		res.status(401).json({ message: "user not found" });
		console.log(error.message);
	}
};

//* @desc  Create new user
//* @route  POST /api/users
//* @access  Public
const createUser = async (req, res) => {
	console.log(req.body);
	try {
		const { name, email, password, locale } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User alredy exists" });
		}
		const user = await User.create({
			name,
			email,
			//Password Encryption in models/user-models.js
			password,
			image: "/images/no_avatar.gif",
			created: moment(),
		});

		//@ send success registration mail
		sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

		await sendgridMail
			.send(successReg(email, name, locale))
			.then(() => {
				console.log("Email sent");
			})
			.catch((error) => {
				console.log(error);
			});

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				image: user.image,
				isAdmin: user.isAdmin,
				created: user.created,
				token: generateToken(user._id),
			});
		} else {
			return res.status(400).json({ message: "User was not created" });
		}
	} catch (error) {
		res.status(401).json({ message: "Invalid user data" });
		console.log(error);
	}
};

//* @desc  Get user profile
//* @route  POST /api/users/profile
//* @access  Private
const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			return res.status(404).json({ message: "[BACKEND] User not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "[BACKEND] User not found" });
		console.log(error);
	}
};

//* @desc  Update user profile
//* @route  POST /api/users/profile
//* @access  Private
const updateUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (req.file) {
			unlink(user.image, (err) => {
				console.log(err);
			});
		}

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			user.image = req.file ? req.file.path : user.image;
			user.created = user.created;

			if (req.body.password) {
				user.password = req.body.password;
			}

			const updatedUser = await user.save();

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				image: updatedUser.image,
				token: generateToken(updatedUser._id),
				created: updatedUser.created,
			});
		} else {
			return res.status(404).json({ message: "[BACKEND] User not found" });
		}
	} catch (error) {
		res.status(401).json({ message: "[BACKEND] User not updated" });
		console.log(error.message);
	}
};

//* @desc  Reset user password
//* @route  POST /api/users/reset
//* @access  Public
const resetPassword = async (req, res) => {
	try {
		const { email, locale } = req.body;
		crypto.randomBytes(32, async (error, buffer) => {
			//! собственное решение ПРОВЕРИТЬ!
			if (error) {
				return res.status(404).json({ message: "Что-то пошло не так" });
			}

			const token = buffer.toString("hex"); //! выяснить про буффер и hex

			const user = await User.findOne({ email: email });

			if (user) {
				user.resetToken = token;
				user.resetTokenExp = Date.now() + 60 * 60 * 1000;

				await user.save();

				//@ send reset password mail
				sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

				await sendgridMail
					.send(resetPass(email, token, locale))
					.then(() => {
						console.log("Reset Password Email sent");
					})
					.catch((error) => {
						console.log(error.message);
					});

				res.json({ successMsg: "Reset mail was sent" });
			} else {
				return res.json({ errorMsg: "Email not found" });
			}
		});
	} catch (error) {
		console.log(error.message);
	}
};

//* @desc  Set new user password
//* @route  POST /api/users/new/password/:token
//* @access  Public
const newPassword = async (req, res) => {
	if (!req.params.token) {
		return res.status(404).json({ message: "Someting wrong" });
	}
	try {
		const user = await User.findOne({
			resetToken: req.params.token,
			resetTokenExp: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(404).json({ message: "user not found" });
		} else {
			if (req.body.password) {
				user.password = req.body.password;
				user.resetToken = undefined;
				user.resetTokenExp = undefined;
			}

			await user.save();

			return res.status(200).json({ message: "Change password is success" });
		}
	} catch (error) {
		console.log(error.message);
		return res.status(404).json({
			message: "token expired",
		});
	}
};

module.exports = {
	authUser,
	getUsers,
	createUser,
	deleteUser,
	getUserProfile,
	updateUserProfile,
	resetPassword,
	newPassword,
};
