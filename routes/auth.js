const express = require("express");
const router = express.Router();

/* GET users listing. */

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up-form");
});


router.post("/sign-up", sign_up_post)
module.exports = router;
