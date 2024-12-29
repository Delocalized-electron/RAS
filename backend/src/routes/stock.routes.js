import { Router } from "express";
import {
  addItems,
  decreaseQuantityByOne,
  getAllItems,
  increaseQuantityByOne,
  removeItems,
  updateItemDetails,
} from "../controllers/stock.controller.js";

const router = Router();
router.route("/add-items").post(addItems);
router.route("/remove-items").delete(removeItems);
router.route("/decrease-quantity-by-one").patch(decreaseQuantityByOne);
router.route("/increase-quantity-by-one").patch(increaseQuantityByOne);
router.route("/update-item").patch(updateItemDetails);
router.route("/").get(getAllItems);

export default router;
