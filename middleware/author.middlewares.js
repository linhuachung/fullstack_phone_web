const jwt = require("jsonwebtoken");
const { RESPONSE_CODE } = require("../constants");
const { getTimeSecond } = require("../utils/Date");

const authenticate = (req, res, next) => {
	try {
		const token = req.header("AccessToken");
		const secretKey = "fullStackApp";
		const decode = jwt.verify(token, secretKey);
		if (decode.exp < getTimeSecond()) {
			return res
				.status(RESPONSE_CODE.FORBIDDEN)
				.send("Phiên làm việc hết hạn vui lòng đăng nhập lại");
		}
		const { id, taiKhoan, email, loaiND } = decode;
		req.user = { id, taiKhoan, email, loaiND };
		next();
	} catch (error) {
		res
			.status(RESPONSE_CODE.BAD_REQUEST)
			.send("Vui lòng đăng nhập để tiếp tục");
	}
};

const authorize = (...arrLoaiND) => (req, res, next) => {
	const { user } = req;
	const { loaiND } = user;
	const index = arrLoaiND.findIndex((role) => role === loaiND);
	if (index === -1)
		return res.status(RESPONSE_CODE.FORBIDDEN).send("Bạn không thể thực hiện chức năng này");
	next();
}

module.exports = { authorize, authenticate }