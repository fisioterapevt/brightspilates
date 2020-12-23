const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const videoSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		videoclip: { type: String, required: true },
		coach: { type: String, required: true },
		level: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		reviews: [reviewSchema],
		rating: { type: Number, required: true, default: 0 },
		numReviews: { type: Number, required: true, default: 0 },
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
