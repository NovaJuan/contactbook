const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

//Register users
router.route('/')
  .post(users.register);

module.exports = router;