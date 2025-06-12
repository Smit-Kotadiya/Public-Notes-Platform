const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const notes = require('./routes/notes');
const users = require('./routes/users');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.json())
app.use('/api/notes', notes);
app.use('/api/users', users);


//Connection to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.error("MongoDB connection failed", err);
  process.exit(1);
});

app.listen(3000, () => console.log("Server running on port 3000"));
