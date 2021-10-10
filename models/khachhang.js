"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KhachHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KhachHang.init(
    {
      taiKhoan: DataTypes.STRING,
      ho: DataTypes.STRING,
      ten: DataTypes.STRING,
      email: DataTypes.STRING,
      gioiTinh: DataTypes.BOOLEAN,
      ngaySinh: DataTypes.DATE,
      diaChi: DataTypes.STRING,
      soDT: DataTypes.STRING,
      matKhau: DataTypes.STRING,
      avatar: DataTypes.STRING(1000),
      loaiKH: DataTypes.STRING,
      loaiND: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "KhachHang",
    }
  );
  return KhachHang;
};
