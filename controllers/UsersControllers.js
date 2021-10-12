const { KhachHang } = require("../models");

// Tạo user
const createUser = (dataUser) => {
  return KhachHang.create(dataUser);
};

// Lấy danh sách user
const getAllUser = () => {
  return KhachHang.findAll();
};

// Lấy user theo taiKhoan
const getUserByTaiKhoan = (taiKhoan) => {
  return KhachHang.findOne({ where: { taiKhoan: taiKhoan } })
}
// Xóa user
const deleteUser = (taiKhoan) => {
  return KhachHang.destroy({ where: { taikhoan: taiKhoan } })
};

// Cập nhật user
const updateUser = (taiKhoan, dataUser) => {
  return KhachHang.update(dataUser, { where: { taiKhoan: taiKhoan } })
}

module.exports = {
  createUser,
  getAllUser,
  getUserByTaiKhoan,
  deleteUser,
  updateUser,
};
