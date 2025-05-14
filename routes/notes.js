const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note
router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const note = new Note({ title, content, author: userId });
    await note.save();
    res.json(note);
});

// Get all notes (public)
router.get('/', async (req, res) => {
    const notes = await Note.find().populate('author', 'username').sort({ updatedAt: -1 });
    res.json(notes);
});

// Get notes by a user
router.get('/user/:userId', async (req, res) => {
    const notes = await Note.find({ author: req.params.userId });
    res.json(notes);
});

// Edit a note
router.put('/:noteId', async (req, res) => {
    const { title, content, userId } = req.body;

    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.author.toString() !== userId) return res.status(403).json({ message: "Not allowed" });

    note.title = title;
    note.content = content;
    note.updatedAt = new Date();
    await note.save();

    res.json(note);
});

// Delete a note
router.delete('/:noteId', async (req, res) => {
    const { userId } = req.body;

    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.author.toString() !== userId) return res.status(403).json({ message: "Not allowed" });

    await note.deleteOne();
    res.json({ message: "Note deleted" });
});

module.exports = router;
