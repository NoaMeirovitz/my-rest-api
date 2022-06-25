var express = require("express");
var router = express.Router();
var cm = require("../controllers/customers");
var mwAuth = require("../middleware/auth");
var fileMgmt = require("../shared/fileMgmt");

router.get("/home", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("cus.html");
  res.sendFile(filePath);
});

router.post("/", cm.addCustomer);

module.exports = router;
