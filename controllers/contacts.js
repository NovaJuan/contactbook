const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');

//@desc     Get all user contacts
//@route    GET /api/v1/contacts
//@access   Private
exports.getAll = async (req, res, next) => {
	try {
		const contacts = await Contact.find({
			user: req.user._id
		}).sort({
			createdAt: -1
		});
		res.status(200).json({
			success: true,
			data: contacts
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			data: {},
			msg: 'Server Error'
		});
	}
};

//@desc     Create contact
//@route    POST /api/v1/contacts
//@access   Private
exports.create = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			data: {},
			errors: errors.array()
		});
	}

	try {
		const contact = await Contact.create({
			...req.body,
			user: req.user._id
		});
		return res.status(201).json({
			success: true,
			data: contact
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			data: {},
			msg: 'Server Error'
		});
	}
};

//@desc     Update contact
//@route    PUT /api/v1/contacts/:id
//@access   Private
exports.update = async (req, res, next) => {
	const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});
	try {
		res.status(200).json({
			success: true,
			data: contact
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			data: {},
			msg: 'Server Error'
		});
	}
};

//@desc     Delete contact
//@route    DELETE /api/v1/contacts/:id
//@access   Private
exports.delete = async (req, res, next) => {
	await Contact.findByIdAndRemove(req.params.id);
	try {
		res.status(200).json({
			success: true,
			data: {}
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			data: {},
			msg: 'Server Error'
		});
	}
};
