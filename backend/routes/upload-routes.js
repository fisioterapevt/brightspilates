const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const maxSize = 1000000; //! максимальный размер

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, `uploads`);
		//cb(null, `content`);
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const fileFilter = (req, file, cb) => {
	const filetypes = /jpg|jpeg|png/;
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

router.post("/", upload.single("avatar"), (req, res) => {
	res.send(`/${req.file.path}`);
});

module.exports = router;
