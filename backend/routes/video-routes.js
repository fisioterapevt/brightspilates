const express = require("express");
const router = express.Router();

const {
	createVideo,
	deleteVideo,
	updateVideo,
	getVideos,
	getVideoById,
} = require("../controllers/video-controllers");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getVideos).post(protect, admin, createVideo);
router
	.route("/:id")
	.delete(protect, admin, deleteVideo)
	.get(protect, admin, getVideoById)
	.put(protect, admin, updateVideo);

module.exports = router;
