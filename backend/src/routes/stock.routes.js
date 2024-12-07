import { Router } from "express";
import { addItems, removeItems } from "../controllers/stock.controller.js";

const router = Router();
router.route("/add-items").post(addItems);
router.route("/remove-items").post(removeItems);

export default router;
