const express = require('express');
const router = express.Router();
const User = require("../models/user");


//POST - /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    if(!email) {
      return res.status(400).json({ error: "Email is required"});
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.json({ message: 'Login successful' });
    } else {
      const name = email.split('@')[0];
      user = new User({
        email,
        name
      });
      await user.save();
      return res.json({ message: 'Created User', user});
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: err.message});
  }});


  //GET /api/users/author?email= -> Get name of the user through email
  router.get('/author', async (req,res) => {
    const { email } = req.query;
    if(!email) return res.status(400).json({ error: "Email is required"});

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found"});

      res.json({ author: user.name});
    } catch (err) {
      res.staus(500).json({ error: err.message});
    }
 
  });

//GET - /api/users -> show all the users (only for testing)
router.get('/', async (req,res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});
module.exports = router;