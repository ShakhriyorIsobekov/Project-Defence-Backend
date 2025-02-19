const express = require("express");
const router = express.Router();
// bcrypt
const bcrypt = require("bcryptjs");
// jwt
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// dotenv
const dotenv = require("dotenv");
dotenv.config();
// get
router.get("/", (req, res) => {
  res.send("Register");
});

// post
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      SamSite: "None",
      maxAge: 360000,
    });

    res.status(200).json({ message: "User created successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
