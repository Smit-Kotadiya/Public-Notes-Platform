const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.error("MongoDB connection failed", err);
  process.exit(1);
});

app.listen(3000, () => console.log("Server running on port 3000"));
