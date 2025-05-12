import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await userData.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
    console.log("test", error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email already registered",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secretKeyoF123123", {
      expiresIn: "24h",
    });

    res.status(200).json({
      success: true,
      token,
      user: { firstName: user.firstName },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

export default router;
