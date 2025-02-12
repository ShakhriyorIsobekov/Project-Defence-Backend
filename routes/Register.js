const express = require("express");
const router = express.Router();
// bcrypt
const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
    res.status(200).json({ message: "User created successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
