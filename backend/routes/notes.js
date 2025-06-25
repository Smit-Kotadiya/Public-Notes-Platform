const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require("../models/user");

// POST /api/notes - create a new note
router.post('/', async (req, res) => {
  try {
    const {title, content, tags, author} = req.body;

    const note = new Note({
      title, content, tags, author
    });

    await note.save()

    const updateUser = await User.findOneAndUpdate(
      { name: author},
      { $addToSet: { noteIds: note._id }},
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Note Created!", note, user: updateUser });

  } catch(err) {
    console.error("Route error: ", err);
    res.status(500).json({ error: err.message });
    }
  });

//DELETE /api/notes/:id - delete a note
router.delete('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;


    const note = await Note.findById(noteId);
    if(!note) return res.status(404).json({error: 'Note not found'});

    if(note.author !== req.body.loggedInUser)
    {
      return res.status(403).json({ error: "Unauthorized to delete this note"});
    }

    await Note.findByIdAndDelete(noteId);

    const user = await User.findOneAndUpdate(
      { name: note.author},
      { $pull: { noteIds: note._id }},
      { new: true}
    );

    res.status(200).json({ message: 'Note Deleted', note, user});

  } catch (err) {
    console.error('Error deleting note: ', err);
    res.status(500).json({error: err.message});
  }
  
});

//PATCH - /notes/:id - Edit Notes
router.patch('/:id', async (req,res) => {
  try {
    const noteId = req.params.id;
    const { title, content, tags, loggedInUser} = req.body;

    const note = await Note.findById(noteId);
    if(!note) return res.status(404).json({error: 'Note not found'});

    if(note.author !== loggedInUser)
    {
        return res.status(403).json({ error: 'Unauthorized to edit this note'});
    }

  if(title) note.title = title;
  if(content) note.content = content;
  if(tags) note.tags = tags;

  await note.save();
  res.status(200).json({message: 'Note Updated', note});

  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

//GET /api/notes/search?tag= - Search by Tag
router.get("/search", async (req, res) => {
  try {
    const { tag, matchType = "any" } = req.query;  // ✅ Correctly use req.query

    let tags = [];

    if (Array.isArray(tag)) {
      tags = tag;
    } else if (typeof tag === "string") {
      tags = tag.split(",").map(t => t.trim()).filter(t => t);
    }

    if (!tags.length) {
      return res.status(400).json({ error: "No tags provided." });
    }

    const filter = matchType === "all"
      ? { tags: { $all: tags } }
      : { tags: { $in: tags } };

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error during tag search" });
  }
});


//GET /api/notes/author?author= - Get all notes of an Author
router.get('/author', async (req,res) => {
  try {
    let requested_author = req.query.author;

    if(!requested_author) return res.status(404).json({error: "No Author with this name found!"})

    const notes = await Note.find({ author: requested_author})
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});
// GET /api/notes - get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
