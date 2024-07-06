const express = require("express");
const User = require("../models/user");
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const passport = require("passport");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up-form");
});

router.post("/sign-up", authController.sign_up_form_post);
module.exports = router;

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// Protected members route
router.get("/members", isAuthenticated, (req, res) => {
  res.render("members");
});

module.exports = router;
