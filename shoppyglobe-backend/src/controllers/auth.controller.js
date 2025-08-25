import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";



function signToken(userId) {
  return jwt.sign({ id: userId }, "supersecretkey", { expiresIn: "7d" });
}


// Register User
export async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}


// Login User
export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}
