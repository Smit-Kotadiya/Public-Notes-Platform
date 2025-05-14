const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/notesapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"));

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
