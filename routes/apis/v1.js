const userController = require('../../controllers/apis/v1/user');
const authController = require('../../controllers/apis/v1/auth');
const authClientRequest = require('../../middlewares/authgaurd');
const { Authlimiter } = require('../../configs/security/rateLimit');

const express = require('express');
let router = express.Router();
router.use('/users', authClientRequest.authClientToken, userController);
router.use('/auth', Authlimiter, authController);
module.exports = router;
