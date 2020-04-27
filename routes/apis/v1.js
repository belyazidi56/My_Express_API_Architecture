const userController = require("../../controllers/apis/v1/user");
const authController = require("../../controllers/apis/v1/auth");
const authClientRequest = require("../../middlewares/authgaurd");

const express = require("express");
let router = express.Router();
router.use("/users", authClientRequest.authClientToken, userController);
router.use("/auth", authController);
module.exports = router;
