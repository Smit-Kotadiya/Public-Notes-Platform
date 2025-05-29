const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const User = require("../models/user");

// Create a note
router.post("/", async (req, res) => {
  const { email, content, tags } = req.body;
  const note = new Note({ content, tags, owner: email });
  await note.save();

  let user = await User.findOne({ email });
  if (!user) user = new User({ email, noteIds: [] });

  user.noteIds.push(note._id);
  await user.save();

  res.json({ message: "Note saved", note });
});

// Get notes by tag
router.get("/tag/:tag", async (req, res) => {
  const notes = await Note.find({ tags: req.params.tag });
  res.json(notes);
});

// Get notes by user
router.get("/user/:email", async (req, res) => {
  const notes = await Note.find({ owner: req.params.email });
  res.json(notes);
});

module.exports = router;
