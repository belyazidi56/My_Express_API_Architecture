const express = require("express");
const userService = require("../../../services/v1/users/user");
const validation = require("../../../middlewares/validation");

let router = express.Router();

router.get("/", userService.getUsers);

router.get("/:id", userService.getUserById);

router.put("/:id", validation.validateUpdateBody(), userService.updateUser);

router.delete("/:id", userService.deleteUser);

module.exports = router;
