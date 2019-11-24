//@desc     Get all user contacts
//@route    GET /api/v1/contacts
//@access   Private
exports.getAll = (req, res, next) => {
  res.send('get all contacts');
}

//@desc     Create contact
//@route    POST /api/v1/contacts
//@access   Private
exports.create = (req, res, next) => {
  res.send('create contact');
}

//@desc     Update contact
//@route    PUT /api/v1/contacts/:id
//@access   Private
exports.update = (req, res, next) => {
  res.send(`Update contact ${req.params.id}`);
}

//@desc     Delete contact
//@route    DELETE /api/v1/contacts/:id
//@access   Private
exports.delete = (req, res, next) => {
  res.send(`Delete contact ${req.params.id}`);
}