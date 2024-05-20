import { Router } from "express";
import linkController from "../controllers/linkController.js";
const router = Router();
router.post("/", linkController.index);
export default router;
