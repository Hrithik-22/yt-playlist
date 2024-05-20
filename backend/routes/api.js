// import { Router } from "express";
// import linkController from "../controllers/linkController.js";
// const router = Router();
// router.post("/", linkController.index);
// export default router;

const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");

router
  .route("/")
  // .get(linkController.getLinksByUserId)
  .post(linkController.calculateDuration);

module.exports = router;
