const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const bcryptjs = require("bcryptjs");
const { createUser, getAllUser, deleteUser, updateUser, getUserByTaiKhoan } = require("../controllers/UsersControllers");
const { authenticate, authorize } = require("../middleware/author.middlewares");
const UsersRouter = express.Router();

UsersRouter.post("/ThemNguoiDung", authenticate, authorize("1"), async (req, res) => {
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


// Xóa User
UsersRouter.delete("/XoaNguoiDung", async (req, res) => {
  try {
    const { taiKhoan = "" } = req.query;
    // Kiểm tra giá trị taiKhoan
    const userList = await getAllUser();
    const findTaiKhoan = userList.findIndex(user => user.taiKhoan === taiKhoan);
    if (findTaiKhoan === -1) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(`Tài khoản ${taiKhoan} không tồn tại`)
    } else {
      await deleteUser(taiKhoan);
      res.status(RESPONSE_CODE.OK).send(`Xóa thành công người dùng ${taiKhoan}`)
    }
  } catch (err) {
    console.log(err);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(err)
  }
})


// Cập nhật user (dành cho người dùng)
UsersRouter.put("/SuaThongTinCaNhan", async (req, res) => {
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
    } = req.body;
    const dataUser = {
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
      loaiKH: false,
      loaiND: false,
    }
    // Kiểm tra tài khoản 
    const getUserList = await getAllUser()
    const findTaiKhoanUser = getUserList.findIndex(user => user.taiKhoan === dataUser.taiKhoan)
    const findEmailUser = getUserList.findIndex(user => user.email === dataUser.email)
    console.log(findEmailUser)
    if (findTaiKhoanUser === -1) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(`Tài khoản ${dataUser.taiKhoan} không tồn tại `)
    }
    else {
      const getOneUser = await getUserByTaiKhoan(dataUser.taiKhoan);
      if (findEmailUser === -1 || getOneUser.email === dataUser.email) {
        await updateUser(dataUser.taiKhoan, dataUser);
        res.status(RESPONSE_CODE.OK).send(`Cập nhật thành công người dùng ${dataUser.taiKhoan}`)
      }
      else {
        res.status(RESPONSE_CODE.BAD_REQUEST).send("Email đã tồn tại")
      }
    }
  } catch (err) {
    console.log(err);
    res.status(RESPONSE_CODE.INTERNAL_SERVER).send(err)
  }
})



module.exports = {
  UsersRouter,
};
