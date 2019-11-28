const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please set a user name']
  },
  email: {
    type: String,
    required: [true, 'Please set a user email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please set a password'],
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed;
});

UserSchema.methods.getToken = function () {
  const token = jwt.sign({
    id: this._id
  }, config.get('jwtSecret'), {
    expiresIn: "30d"
  });
  return token;
}

UserSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Users', UserSchema);