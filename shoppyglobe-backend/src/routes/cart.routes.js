import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import { addToCart, updateCartItem, removeFromCart, getMyCart } from "../controllers/cart.controller.js";

const router = Router();

// Protected routes
router.use(auth);

router.get("/", getMyCart);

router.post(
  "/",
  [
    body("productId").notEmpty().withMessage("productId is required"),
    body("quantity").isInt({ min: 1 }).withMessage("quantity must be >= 1")
  ],
  addToCart
);

router.put("/:id", updateCartItem);
router.delete("/:id", removeFromCart);

export default router;
