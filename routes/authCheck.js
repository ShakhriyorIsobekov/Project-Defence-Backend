const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  try {
    res.json({ isAuthenticated: true });
  } catch (error) {
    console.error("Error in auth-check route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
