const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_JWT_SECRET, {
		expiresIn: "720m",
	});
};

module.exports = generateToken;
