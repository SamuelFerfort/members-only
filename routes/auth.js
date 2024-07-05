const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")
/* GET users listing. */

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up-form");
});




router.post("/sign-up", authController.sign_up_form_post)
module.exports = router;


router.get("/login", authController.login_get)