const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.new_message_post = [
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("message", "Message must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.user);
    if (!errors.isEmpty()) {
      // If there are errors, re-render the form with error messages
      return res.render("message-form", {
        errors: errors.array(),
        message: { title: req.body.title, text: req.body.message },
      });
    }
    const message = new Message({
      title: req.body.title,
      text: req.body.message,
      author: req.user._id,
    });
    try {
      await message.save();
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.messageId);

  res.redirect("/");
});
