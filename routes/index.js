const express = require("express");
const Message = require("../models/message");
const router = express.Router();
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const passport = require("passport");
/* GET home page. */
router.get("/", async (req, res, next) => {
  const messages = await Message.find().populate("author");

  res.render("index", { messages });
});

router.get("/sign-up", authController.sign_up_form_get);
router.post("/sign-up", authController.sign_up_form_post);

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true, // Enable flash messages for authentication failures
  }),
  (req, res) => {
    console.log("req.flash():", req.flash());
  }
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/");
  });
});

router.get("/new-message", isAuthenticated, (req, res) => {
  res.render("new-message", {
    errors: null,
    message: null,
  });
});

router.post(
  "/new-message",
  isAuthenticated,
  messageController.new_message_post
);

router.get("/verification", isAuthenticated, (req, res) =>
  res.render("verification", {
    error: null,
  })
);

router.post("/verification", isAuthenticated, authController.verification_post);

router.post("/delete", isAuthenticated, messageController.delete_post);

module.exports = router;
