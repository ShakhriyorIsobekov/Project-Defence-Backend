const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

router.get("/", (req, res) => {
  res.send(`login`);
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login Successful!", token });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;

// // store token in HTTP only cookie
// res.cookie("token", token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "None",
//   maxAge: 3600000,
// });
