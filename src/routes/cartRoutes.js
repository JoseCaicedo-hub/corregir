import express from "express";
import {
  createCart,
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", createCart);
router.post("/:cartId/products", addToCart);
router.get("/:cartId", getCart);
router.delete("/product/:cartProductId", removeFromCart);

export default router;
