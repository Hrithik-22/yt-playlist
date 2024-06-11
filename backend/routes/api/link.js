

const express = require("express");
const router = express.Router();
const linkController = require("../../controllers/linkController");

router
  .route("/")
  .post(linkController.calculateDuration);

module.exports = router;
