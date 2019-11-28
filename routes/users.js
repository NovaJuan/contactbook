const express = require('express');
const router = express.Router();
const {
  check
} = require('express-validator');

const users = require('../controllers/users');

//Register users
router.route('/')
  .post([check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please add a password with at least 6 characters').isLength({
      min: 6
    })
  ], users.register);

module.exports = router;