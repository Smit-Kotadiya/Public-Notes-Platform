const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login or auto-register with just a username
router.post('/login', async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Username required" });

    let user = await User.findOne({ username });
    if (!user) {
        user = new User({ username });
        await user.save();
    }

    res.json({ userId: user._id, username: user.username });
});

module.exports = router;
