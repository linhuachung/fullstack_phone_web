const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const { getUserByTaiKhoan } = require("../controllers/UsersControllers");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../helpers/jwt.helpers");
const authorRouter = express.Router();

authorRouter.post("/DangNhap", async (req, res) => {
	try {
		const { taiKhoan, matKhau } = req.body;
		if (!taiKhoan || !matKhau)
			res.status(RESPONSE_CODE.BAD_REQUEST).send("Tài khoản hoặc mật khẩu không hợp lệ");
		const userFind = await getUserByTaiKhoan(taiKhoan);
		if (!userFind) {
			res.status(RESPONSE_CODE.BAD_REQUEST).send("Tài khoản không hợp lệ")
		}
		const checkingMatKhau = bcryptjs.compareSync(matKhau, userFind.matKhau);
		if (!checkingMatKhau)
			res.status(RESPONSE_CODE.BAD_REQUEST).send("Mật khẩu không hợp lệ")
		const token = generateToken(userFind);
		res.status(RESPONSE_CODE.OK).send({
			taiKhoan: userFind.taiKhoan,
			ho: userFind.ho,
			ten: userFind.ten,
			email: userFind.email,
			gioiTinh: userFind.gioiTinh,
			ngaySinh: userFind.ngaySinh,
			diaChi: userFind.diaChi,
			soDT: userFind.soDT,
			avatar: userFind.avatar,
			loaiKH: userFind.loaiKH,
			loaiND: userFind.loaiND,
			AccessToken: token,
		})
	} catch (err) {
		console.log(err); res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(err)
	}
})



module.exports = {
	authorRouter

}