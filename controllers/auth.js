const User = require('../models/User');
const {
  validationResult
} = require('express-validator')

//@desc     Get user
//@route    GET /api/v1/auth
//@access   Private
exports.getUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
}

//@desc     Log in user
//@route    POST /api/v1/auth
//@access   Public
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      data: {},
      errors: errors.array()
    });
  }

  try {
    let user = await User.findOne({
      email: req.body.email
    }).select('+password');
    if (!user) {
      return res.status(400).json({
        success: false,
        data: {},
        msg: "Invalid credentials"
      });
    }

    const isMatch = await user.verifyPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        data: {},
        msg: "Invalid credentials"
      });
    };

    res.status(201).json({
      sucess: true,
      token: user.getToken()
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      sucess: false,
      data: {},
      msg: 'Something went wrong.'
    });
  }
}