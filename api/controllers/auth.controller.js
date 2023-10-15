const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const errorHandler = require('../utils/error');

// /api/auth/signup
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, 'All fields are required.'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return next(errorHandler(400, 'Username or email already exists'));
    }

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
    });
  } catch (err) {
    next(err);
  }
};

// /api/auth/signin
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return next(errorHandler(404, `User not found`));
    }

    const validPassword = await bcrypt.compare(password, userExist.password);

    if (!validPassword) {
      return next(errorHandler(401, `Wrong credentials`));
    }

    const token = jwt.sign(
      { userId: userExist._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );

    const { password: pass, ...rest } = userExist._doc;

    res.status(200).json({
      status: 'success',
      user: rest,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
};
