const express = require("express");
const { authorRouter } = require("./AuthorRouter");
const { UsersRouter } = require("./UsersRouter");
const rootRouter = express.Router();

rootRouter.use("/QuanLyNguoiDung", UsersRouter);
rootRouter.use("/QuanLyDangNhap", authorRouter);
module.exports = {
  rootRouter,
};
