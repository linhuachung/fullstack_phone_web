"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("KhachHangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      taiKhoan: {
        type: Sequelize.STRING,
      },
      ho: {
        type: Sequelize.STRING,
      },
      ten: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      gioiTinh: {
        type: Sequelize.BOOLEAN,
      },
      ngaySinh: {
        type: Sequelize.DATE,
      },
      diaChi: {
        type: Sequelize.STRING,
      },
      soDT: {
        type: Sequelize.STRING,
      },
      matKhau: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING(1000),
      },
      loaiKH: {
        type: Sequelize.STRING,
      },
      loaiND: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("KhachHangs");
  },
};
