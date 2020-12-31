const express = require("express");
const router = express.Router();

const {
	createOrder,
	deleteOrder,
	getOrderList,
	updateOrderToPaid,
} = require("../controllers/order-controllers");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, createOrder);

router.route("/:id").delete(protect, deleteOrder);

router.route("/orderlist").get(protect, getOrderList);

router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
