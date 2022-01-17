import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const resetPassword = asyncHandler(async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: 'error', message: error.details[0].message });
		const foundUser = await User.findOne({ email: req.body.email });

		if (!foundUser)
			return res.status(400).send({ message: 'Error, try again' });

		if (foundUser.resetCode != req.body.otp) {
			return res.status(400).json({ message: 'Otp verification failed' });
		}

		const salt = await bcrypt.genSalt(10);
		foundUser.password = await bcrypt.hash(req.body.password, salt);
		foundUser.resetCode = null;

		const changed = await foundUser.save();

		res.status(200).json({ status: 'success', email: changed.email });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});

const validate = item => {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().required().min(5),
		otp: Joi.string().required(),
	});
	return schema.validate(item);
};

export default resetPassword;
