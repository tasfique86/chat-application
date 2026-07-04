//external imports
const express = require("express");
const router = express.Router();

//internal imports
const { getLoginPage } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

//login route
router.get("/", decorateHtmlResponse("Login"), getLoginPage);

module.exports = router;
