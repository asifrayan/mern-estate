const express = require('express');
const { test } = require('../controllers/user.controller');

const router = express.Router();

// /api/user/test
router.get('/test', test);

module.exports = router;
