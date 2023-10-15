const express = require('express');
const { signup } = require('../controllers/auth.controller');

const router = express.Router();

// /api/auth/signup
router.post('/signup', signup);

module.exports = router;
