import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.put("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) user.password = req.body.password;
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    message: "Profile updated successfully",
  });
});

router.delete("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne();
  res.json({ message: "User account deleted successfully" });
});

export default router;
