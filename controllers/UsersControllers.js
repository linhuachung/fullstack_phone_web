const { KhachHang } = require("../models");

// Tạo user
const createUser = (dataUser) => {
  return KhachHang.create(dataUser);
};

// Lấy danh sách user
const getAllUser = () => {
  return KhachHang.findAll();
};

module.exports = {
  createUser,
  getAllUser,
};
