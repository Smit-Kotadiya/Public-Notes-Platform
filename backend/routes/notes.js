const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const User = require("../models/user");

// POST /notes - create a new note
router.post('/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /notes - get all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Login failed' });
  }
});

module.exports = router;
