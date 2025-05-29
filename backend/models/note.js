const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: String,
  tags: [String],
  owner: String,
});

module.exports = mongoose.model("Note", noteSchema);
