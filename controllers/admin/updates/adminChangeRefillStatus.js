import asyncHandler from 'express-async-handler';
import Joi from 'joi';
import Refill from '../../../models/refillModel.js';
import { User } from '../../../models/userModel.js';
import generateNotification from '../../notificationController/generateNotification.js';

const adminChangeRefillStatus = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: 'error', message: error.details[0].message });

		const item = await Refill.findById(id);

		if (!item) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Item not found' });
		}

		if (item.status == 'completed') {
			return res.status(500).json({
				status: 'error',
				message: 'This transaction has already been completed',
			});
		}

		const user = await User.findById(item.user);

		if (status == 'completed') {
			user.walletBalance = user.walletBalance + item.amount;
			await user.save();
			generateNotification({
				user: user._id,
				details: `Your account has been successfully refilled with ${item.amount} BDT. Transaction id for this transaction: ${item._id}, fund received through ${item.type} transfer from ${item.target}.`,
				image: '/icon.png',
				type: 'refill',
				target: item._id,
			});
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
				'completed'
			)
			.required(),
	});
	return schema.validate(item);
};

export default adminChangeRefillStatus;
