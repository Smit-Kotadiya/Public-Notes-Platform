const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  noteIds: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("User", userSchema);
//String, Type Raus, Typ Rein und Ids automatisch generiert