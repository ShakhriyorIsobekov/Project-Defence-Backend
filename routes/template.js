const express = require("express");
const router = express.Router();
const Template = require("../models/Template");
const authenticateToken = require("../middleware/authMiddleware");

// creates a template in db
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const template = await Template.create({
      title,
      content,
      userId,
    });
    res.status(201).json({ message: "Template created", template });
  } catch (err) {
    console.log("Template creation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// gets a template from user from frontend
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const templates = await Template.findAll({ where: { userId } });
    res.json(templates);
  } catch (err) {
    console.log("Error fetching templates", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update template of users corrected by them
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;
  } catch (err) {}
});
