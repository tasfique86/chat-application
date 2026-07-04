//external imports
const express = require("express");
const router = express.Router();

//internal imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

//inbox route
router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
