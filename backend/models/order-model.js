const mongoose = require("mongoose");
//const { strict } = require("yargs");

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		//orderItem: {
		name: { type: String, required: true },
		fullName: { type: String, required: true },
		qty: { type: Number, required: true, default: 1 },
		price: { type: Number, required: true },
		//},
		paymentMethod: { type: String },
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		isPaid: { type: Boolean, required: true, default: false },
		paidAt: { type: Date },
		expDate: { type: Date },
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
