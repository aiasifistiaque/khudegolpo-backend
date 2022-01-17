import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import Joi from 'joi';

const updateUser = asyncHandler(async (req, res) => {
	const id = req.user._id;
	const { image, name, description, email, username } = req.body;
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: 'error', message: error.details[0].message });

		const exists = await User.findOne({
			username,
		});

		if (exists && exists._id != id) {
			return res.status(500).send({ message: 'username already taken' });
		}

		const user = await User.findById(id).select('-password');
		if (image) user.image = image;
		if (name) user.name = name;
		if (description) user.description = description;
		if (username) user.username = username;
		if (email) user.email = email;

		const doc = await user.save();
		return res.status(200).json({ status: 'success', doc });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

function validate(user) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(50),
		email: Joi.string().min(5).max(255).email(),
		username: Joi.string().alphanum().min(4).max(255),
		password: Joi.string().min(5).max(255),
		role: Joi.string(),
		image: Joi.string(),
		description: Joi.string(),
	});
	return schema.validate(user);
}

export default updateUser;
