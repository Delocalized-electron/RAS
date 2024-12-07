import { Router } from "express";
import { addItems } from "../controllers/stock.controller.js";

const router = Router();
router.route("/add-items").post(addItems);

export default router;
