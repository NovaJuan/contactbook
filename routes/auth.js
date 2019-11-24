const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

router.route('/')
  .get(auth.getUser)
  .post(auth.login);

module.exports = router;