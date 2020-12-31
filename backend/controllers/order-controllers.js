const moment = require("moment");

//const nodemailer = require("nodemailer");
//const sendgrid = require("nodemailer-sendgrid-transport");
//const sendgridMail = require("@sendgrid/mail");

//const { successReg, resetPass } = require("../emails/auth-emails");
//const User = require("../models/user-model");
const Order = require("../models/order-model");
//const generateToken = require("../utils/generateToken");

//* @desc  Create new order
//* @route  POST /api/orders
//* @access  Public
const createOrder = async (req, res) => {
	//console.log("[ORDER CONTROLLER req]", req.body);
	//console.log("[ORDER CONTROLLER ]user id", req.user._id);

	try {
		const { orderName, orderFullName, orderPrice } = req.body;

		const order = await Order.create({
			name: orderName,
			fullName: orderFullName,
			price: orderPrice,
			user: req.user._id,
		});

		const createdOrder = await order.save();

		return res.status(201).json(createdOrder);
	} catch (error) {
		res.status(401).json({ message: "Invalid user data" });
		console.log(error);
	}
};

//* @desc  Delete order
//* @route  DELETE /api/orders/:id
//* @access  Private
const deleteOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);

		if (order) {
			await order.remove();
			res.json({ message: "Order removed" });
		} else {
			return res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "[BACKEND] Order not found" });
		console.log(error);
	}
};

//* @desc  Get order list
//* @route  GET /api/orders/:id
//* @access  Private
const getOrderList = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id });
		res.json(orders);
	} catch (error) {
		res.status(404).json({ message: error.message });
		console.log(error.message);
	}
};

//* @desc  Update order to paid
//* @route  GET /api/orders/:id/pay
//* @access  Private
const updateOrderToPaid = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);

		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			//order.expDate = Date.now()
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.payer.email_address,
			};

			const updatedOrder = await order.save();

			res.json(updatedOrder);
		} else {
			return res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
		console.log(error);
	}
};

module.exports = {
	createOrder,
	deleteOrder,
	getOrderList,
	updateOrderToPaid,
};
