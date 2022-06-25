var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth");
var mwAuth = require("../middleware/auth");
const fileMgmt = require("../shared/fileMgmt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(`Welcome to Noa Meirovitz's rest API, this is our home page. <br><br>
  * To add a customer go to /customers/home <br>
  * To log in go to /login <br>
  * To see customer details go to /businesses/ and type ID number <br>
  * To add a new business card go to /create-business.html <br>
  * To edit or delete business card go to /edit-business.html <br>
  * To see business card by ID go to /businesses/ then type business ID number`);
});

router.get("/login", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("login.html");
  res.sendFile(filePath);
});

router.post("/login", auth.login);

router.get("/logout", mwAuth, function (req, res, next) {
  return res
    .clearCookie("access_token")
    .status(200)
    .send("logged out successfully");
});

module.exports = router;
