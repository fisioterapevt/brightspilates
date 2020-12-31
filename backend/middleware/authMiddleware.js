const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);

			req.user = await User.findById(decoded.id).select("-password");
			next();
		} catch (error) {
			console.error(error.message);
			res.status(401).json({ message: error.message });
		}
	}

	if (!token) {
		res.status(401).json({ message: "No authorized, no token" });
	}
};

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401).json({ message: "not_admin" });
	}
};

module.exports = { protect, admin };
