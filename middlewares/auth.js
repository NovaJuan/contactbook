const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  // get token from header
  let token = req.header('authorization');

  if (!token || !token.includes('Bearer')) {
    return res.status(401).json({
      success: false,
      data: {},
      msg: 'Invalid token'
    });
  }

  token = (token.split(' '))[1]
  let id;
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    id = decoded.id;
  } catch (err) {
    return res.status(401).json({
      success: false,
      data: {},
      msg: 'Token is not valid'
    });
  }

  try {
    req.user = await User.findById(id);
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      data: {},
      msg: 'Something went wrong'
    });
  }
}