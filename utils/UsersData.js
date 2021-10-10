const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync();
const hashPassword = bcryptjs.hashSync("admin", salt);
const UsersData = [
  {
    taiKhoan: "admin",
    ho: "admin",
    ten: "admin",
    email: "admin@gmail.com",
    gioiTinh: true,
    ngaySinh: "2021-01-01",
    diaChi: "",
    soDT: "",
    matKhau: hashPassword,
    avatar: "",
    loaiKH: true,
    loaiND: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  UsersData,
};
