const jwt = require("jsonwebtoken");


const generateToken = (user) => {
	const payload = {
		id: user.id,
		taiKhoan: user.taiKhoan,
		email: user.email,
		loaiND: user.loaiND,
	};
	const secretKey = "fullStackApp";
	const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
	return token;
}

module.exports = { generateToken }