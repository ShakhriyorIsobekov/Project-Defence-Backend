const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}` });
});

module.exports = router;
