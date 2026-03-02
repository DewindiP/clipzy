import cloudinary from "../config/cloudinary.js";
// Update user profile image (avatar)
export const updateAvatar = async (req, res) => {
  try {
    if (!req.file || !req.user) return res.status(400).json({ message: "No image uploaded" });
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.avatar = req.file.path;
    await user.save();
    res.json({ avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: "Failed to update avatar" });
  }
};

// Get current user profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json("User exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashed,
  });

  res.json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json("Invalid credentials");
  }
};