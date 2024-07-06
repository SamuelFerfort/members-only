const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");




exports.sign_up_form_post = [
  body("username", "Username must not be empty")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Username already in use");
      }
    })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password must not be empty")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  body("first_name", "First name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are validation errors
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    try {
      await user.save();
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }),
];



