const User = require('../models/User');
const {
  validationResult
} = require('express-validator');

//@desc     Create user
//@route    POST /api/v1/users
//@access   Public
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    let user = await User.findOne({
      email: req.body.email
    });
    if (user) {
      return res.status(400).json({
        success: false,
        data: {},
        msg: "User already exist."
      });
    }

    user = await User.create(req.body);

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