const express = require('express');
const router = express.Router();
const authorized = require('../middlewares/auth');
const {
  check
} = require('express-validator');
const contacts = require('../controllers/contacts');

router.use(authorized);

router.route('/')
  .get(contacts.getAll)
  .post([check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail()
  ], contacts.create)

router.route('/:id')
  .put(contacts.update)
  .delete(contacts.delete);

module.exports = router;