import asyncHandler from 'express-async-handler';
import { User } from '../../../models/userModel.js';
import Joi from 'joi';
import Withdraw from '../../../models/withdrawModel.js';

const adminChangeWithdrawStatus = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: 'error', message: error.details[0].message });

		const item = await Withdraw.findById(id);

		if (item.status == 'refunded') {
			return res.status(500).json({
				status: 'error',
				message: 'This transaction has already been refunded',
			});
		}

		const user = await User.findById(item.user);

		if (!item) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Item not found' });
		}

		if (status == 'refunded') {
			user.earning = user.earning + item.amount;
			await user.save();
		}

		item.status = status;

		const doc = await item.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

const validate = item => {
	const schema = Joi.object({
		status: Joi.string()
			.valid(
				'requested',
				'processing',
				'successful',
				'cancelled',
				'rejected',
				'refunded',
				'reported'
			)
			.required(),
	});
	return schema.validate(item);
};

export default adminChangeWithdrawStatus;
