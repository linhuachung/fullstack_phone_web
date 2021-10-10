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

    const datauser = {
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
    const newUserCreate = await createUser(datauser);
    res.status(RESPONSE_CODE.OK).send(newUserCreate);

    res;
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
