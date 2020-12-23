const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
			cb(null, `content/images`);
		} else if (file.mimetype === "video/mp4") {
			cb(null, `content/videos`);
		}
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.originalname.split(".")[0]}-${Date.now()}${
				file.fieldname
			}${path.extname(file.originalname)}`
		);
	},
});

const maxSize = 1000000000000000;

const fileFilter = (req, file, cb) => {
	const filetypes = /jpg|jpeg|png|mp4/;
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb("Images onlys");
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: maxSize },
});

router.post("/", upload.single("content"), (req, res) => {
	res.send(`/${req.file.path}`);
});

module.exports = router;
