const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const bcryptjs = require("bcryptjs");
const { createUser, getAllUser } = require("../controllers/UsersControllers");
const UsersRouter = express.Router();

UsersRouter.post("/ThemNguoiDung", async (req, res) => {
  try {
    const {
      taiKhoan,
      ho,
      ten,
      email,
      gioiTinh,
      ngaySinh,
      diaChi,
      soDT,
      matKhau,
      avatar,
      loaiKH,
      loaiND,
    } = req.body;

    const salt = bcryptjs.genSaltSync();
    const hashPassword = bcryptjs.hashSync(matKhau, salt);

    const dataUser = {
      taiKhoan,
      ho,
      ten,
      email,
      gioiTinh,
      ngaySinh,
      diaChi,
      soDT,
      matKhau: hashPassword,
      avatar,
      loaiKH,
      loaiND,
    };

    // Kiểm tra dữ liệu trong database 
    const getUser = await getAllUser()
    let taiKhoanUserFinding = getUser.findIndex(user => user.taiKhoan === dataUser.taiKhoan);
    let emailUserFinding = getUser.findIndex(user => user.email === dataUser.email);
    if (taiKhoanUserFinding === -1) {
      if (emailUserFinding === -1) {
        const newUserCreate = await createUser(dataUser);
        res.status(RESPONSE_CODE.OK).send(newUserCreate);
      } else {
        res.status(RESPONSE_CODE.BAD_REQUEST).send("Email đã tồn tại");
      }
    } else {
      res.status(RESPONSE_CODE.BAD_REQUEST).send("Tài khoản đã tồn tại");
    }

  } catch (err) {
    console.log(err);
    res.send(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(err);
  }
});

// Lấy danh sách user
UsersRouter.get("/LayDanhSachNguoiDung", async (req, res) => {
  try {
    const userList = await getAllUser();
    res.status(RESPONSE_CODE.OK).send(userList);
  } catch (err) {
    console.log(err);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(err);
  }
});

module.exports = {
  UsersRouter,
};
