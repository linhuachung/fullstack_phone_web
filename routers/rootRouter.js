const express = require("express");
const { UsersRouter } = require("./UsersRouter");
const rootRouter = express.Router();

rootRouter.use("/QuanLyNguoiDung", UsersRouter);

module.exports = {
  rootRouter,
};
