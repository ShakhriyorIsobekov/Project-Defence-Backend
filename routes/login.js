// express
const express = require("express");
const router = express.Router();
// bcryp
const bcrypt = require("bcryptjs");
// User
const User = require("../models/User");

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
    res.status(200).json({ message: "Login Successful!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
