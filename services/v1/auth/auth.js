const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const config = require("../../../configs/config/config");
const userModel = require("../../../models/user");

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let { name, email, password } = req.body;

  let isEmailExists = await userModel.findOne({ email: email });

  if (isEmailExists) {
    return res.status(409).json({
      errors: [
        {
          code: "USER_DUPLICATION",
          description: "email already exists",
        },
      ],
    });
  }

  let hashedPassword = await bcrypt.hash(password, 8);

  try {
    let user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (!user) {
      throw new error();
    }

    return res.status(201).json({
      success: [
        {
          msg: "user registered successfully",
          data: user,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          code: "SERVER_ERROR",
          description: "something went wrong, Please try again",
        },
      ],
    });
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let { email, password } = req.body;

  try {
    let isUserExists = await userModel.findOne({ email: email });

    let isPasswordValid = await bcrypt.compare(password, isUserExists.password);

    if (!isUserExists || !isPasswordValid) {
      return res.status(401).json({
        errors: [
          {
            msg: "email/password is wrong",
          },
        ],
      });
    }

    let token = jwt.sign({ id: isUserExists._id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).json({
      success: [
        {
          msg: "user login successfully",
          email: email,
          token: token,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: "there was a problem login a user.",
        },
      ],
    });
  }
};

module.exports = {
  register: register,
  login: login,
};
