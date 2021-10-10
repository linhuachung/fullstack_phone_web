const { khachhang } = require("../models");

// Tạo user
const createUser = (dataUser) => {
  khachhang.create();
};

module.exports = {
  createUser,
};
