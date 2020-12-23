const Video = require("../models/video-model");

//*********************************/
//************* ADMIN *************/
//*********************************/
//* @desc  Create a video
//* @route  POST /api/videos
//* @access  Private/Admin
const createVideo = async (req, res) => {
	try {
		const video = new Video({
			name: "Sample name",
			image: "/uploads/mock/example.jpg",
			videoclip: "/videos/sample.mp4",
			coach: "Sample coach",
			level: "beginer",
			category: "Back",
			numReviews: 0,
			description: "Sample description",
			creator: req.user._id,
		});

		const createdVideo = await video.save();

		return res.status(201).json(createdVideo);
	} catch (error) {
		res.status(404).json({ message: "Video was not created" });
		console.log(error);
	}
};

//* @desc  Updated a video
//* @route  PUT /api/videos/:id
//* @access  Private/Admin
const updateVideo = async (req, res) => {
	try {
		const {
			name,
			image,
			videoclip,
			coach,
			level,
			category,
			description,
		} = req.body;

		const video = await Video.findById(req.params.id);

		if (video) {
			video.name = name;
			video.image = image;
			video.videoclip = videoclip;
			video.coach = coach;
			video.level = level;
			video.category = category;
			video.description = description;

			const updatedVideo = await video.save();
			return res.json(updatedVideo);
		} else {
			return res.status(404).json({ message: "Video not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "Video was not updated" });
		console.log(error);
	}
};

//* @desc  Delete video
//* @route  DELETE /api/videos/:id
//* @access  Private/Admin
const deleteVideo = async (req, res) => {
	try {
		const video = await Video.findById(req.params.id);
		if (video) {
			await video.remove();
			res.json({ message: "video removed" });
		} else {
			return res.status(404).json({ message: "[BACKEND] Video not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "[BACKEND] Video not found" });
		console.log(error);
	}
};

//*********************************/
//************* CLIENT ************/
//*********************************/

//* @desc  Fetch all videos
//* @route  GET /api/videos
//* @access  Public
const getVideos = async (req, res) => {
	try {
		const videos = await Video.find({});
		res.json(videos);
	} catch (error) {
		res.status(404).json({ message: "Videos not found" });
		console.log(error);
	}
};

//* @desc  Fetch single Video
//* @route  GET /api/Videos:id
//* @access  Public
const getVideoById = async (req, res) => {
	try {
		const video = await Video.findById(req.params.id);

		if (video) {
			res.json(video);
		} else {
			return res.status(404).json({ message: "Video not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "Video not found" });
		console.log(error);
	}
};

module.exports = {
	getVideos,
	createVideo,
	updateVideo,
	getVideoById,
	deleteVideo,
};
