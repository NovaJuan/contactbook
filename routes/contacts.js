const express = require('express');
const router = express.Router();

const contacts = require('../controllers/contacts');

router.route('/')
  .get(contacts.getAll)
  .post(contacts.create)

router.route('/:id')
  .put(contacts.update)
  .delete(contacts.delete);

module.exports = router;