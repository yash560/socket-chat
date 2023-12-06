const express = require('express');
const route=express.Router();
const User=require('../models/userModel');

// Signup Route

route.get('/all', async (req, res) => {
  try {
    const users = await User.find({}); // Exclude passwords from the response
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

route.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  // Create a new user
  const user = new User({
    name,
    email,
    password,
  });

  // Save the user to the database
  await user.save();
  res.json({ message: 'User registered successfully' });
});

// Login Route
route.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Check if the user exists and the password is correct
  if (user && (user.password==password)) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports=route;
