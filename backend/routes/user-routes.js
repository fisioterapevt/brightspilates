const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const {
	createUser,
	getUsers,
	authUser,
	deleteUser,
	getUserProfile,
	updateUserProfile,
	resetPassword,
	newPassword,
} = require("../controllers/user-controllers");
const { protect, admin } = require("../middleware/authMiddleware");

const fileUpload = require("../middleware/fileUploadMiddleware");

router.post("/login", authUser);

router.route("/").post(createUser).get(protect, admin, getUsers);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, fileUpload.single("avatar"), updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);
//.get(protect, admin, getUserById)
//.put(protect, admin, updateUser);
router.route("/password/reset").post(resetPassword);
router.route("/new/password/:token").post(newPassword);

module.exports = router;
