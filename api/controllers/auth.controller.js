const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// /api/auth/signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      status: 'success',
      message: 'user created successfully',
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  signup,
};
