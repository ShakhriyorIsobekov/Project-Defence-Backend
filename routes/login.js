// express
const express = require("express");
const router = express.Router();
// bcryp
const bcrypt = require("bcryptjs");
// User
const User = require("../models/User");
// jwt token
const jwt = require("jsonwebtoken");
// cookie parser
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const SECRET_KEY = process.env.JWT_SECRET;
// get
router.get("/", (req, res) => {
  res.send(`login`);
});

// post
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    // generate token
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    // store token in HTTP only cookie
    res.cookie("token", token, {
      httOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });
    res.status(200).json({ message: "Login Successful!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
