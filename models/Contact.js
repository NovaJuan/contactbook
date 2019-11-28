const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  name: {
    type: String,
    required: [true, 'Please set a name']
  },
  email: {
    type: String,
    required: [true, 'Please set a email']
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'Personal',
    enum: [
      'Personal',
      'Professional'
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contacts', ContactSchema);