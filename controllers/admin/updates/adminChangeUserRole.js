import asyncHandler from 'express-async-handler';
import { User } from '../../../models/userModel.js';
import Joi from 'joi';

const adminChangeUserRole = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { role } = req.body;
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: 'error', message: error.details[0].message });

		const item = await User.findById(id).select('-password');

		if (!item) {
			return res
				.status(500)
				.json({ status: 'error', message: 'User not found' });
		}

		item.role = role;

		const doc = await item.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

const validate = item => {
	const schema = Joi.object({
		role: Joi.string().valid('user', 'admin', 'banned').required(),
	});
	return schema.validate(item);
};

export default adminChangeUserRole;
