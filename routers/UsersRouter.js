const express = require("express");
const UsersRouter = express.Router();

UsersRouter.use("/ThemNguoiDung", async (req, res) => {
  const {} = req.body;
});

module.exports = {
  UsersRouter,
};
