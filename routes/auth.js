const express = require('express');
const router = express.Router();
const authorized = require('../middlewares/auth');

const {
  check
} = require('express-validator');

const auth = require('../controllers/auth');

router.route('/')
  .get(authorized, auth.getUser)
  .post([
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please add a password').not().isEmpty()
  ], auth.login);

module.exports = router;