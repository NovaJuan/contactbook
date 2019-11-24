//@desc     Get user
//@route    GET /api/v1/auth
//@access   Private
exports.getUser = (req, res, next) => {
  res.send('get logged user');
}

//@desc     Log in user
//@route    POST /api/v1/auth
//@access   Public
exports.login = (req, res, next) => {
  res.send('login');
}