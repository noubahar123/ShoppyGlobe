import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

export async function addToCart(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (quantity > product.stock) {
      return res.status(400).json({ message: "Quantity exceeds available stock" });
    }

    const item = await CartItem.findOneAndUpdate(
      { user: userId, product: productId },
      { $inc: { quantity } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Ensure not over stock after increment
    if (item.quantity > product.stock) {
      item.quantity = product.stock;
      await item.save();
    }

    res.status(201).json(item);
  } catch (err) {
    if (err.code === 11000) {
      // unique index race condition
      return addToCart(req, res, next);
    }
    next(err);
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params; // cart item id
    const { quantity } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid cart item id" });
    }

    const item = await CartItem.findOne({ _id: id, user: userId }).populate("product");
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    if (quantity < 1) {
      await CartItem.deleteOne({ _id: id, user: userId });
      return res.json({ message: "Item removed" });
    }

    if (quantity > item.product.stock) {
      return res.status(400).json({ message: "Quantity exceeds available stock" });
    }

    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function removeFromCart(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params; // cart item id 

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid cart item id" });
    }

    const result = await CartItem.deleteOne({ _id: id, user: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Item removed" });
  } catch (err) {
    next(err);
  }
}

export async function getMyCart(req, res, next) {
  try {
    const userId = req.user.id;
    const items = await CartItem.find({ user: userId }).populate("product");
    res.json(items);
  } catch (err) {
    next(err);
  }
}
