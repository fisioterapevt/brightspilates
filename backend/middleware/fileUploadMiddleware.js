const multer = require("multer");

const MIME_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

const fileUpload = multer({
	//* конфигурация
	limits: 50000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "uploads/avatars");
		},
		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
			//* создаем уникльное имя файла

			cb(null, file.fieldname + "-" + Date.now() + "." + ext);
		},
	}),
	fileFilter: (req, file, cb) => {
		//*двойное отрицание !! конвертирует данные в булево значение
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error("Invalid mime type");
		cb(error, isValid);
	},
});

module.exports = fileUpload;
