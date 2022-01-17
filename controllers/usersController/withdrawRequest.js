import asyncHandler from 'express-async-handler';
import Withdraw from '../../models/withdrawModel.js';
import Joi from 'joi';
import { User } from '../../models/userModel.js';
import generateNotification from '../notificationController/generateNotification.js';

const withdrawRequest = asyncHandler(async (req, res) => {
	const { error } = validate(req.body);
	if (error)
		return res
			.status(400)
			.json({ status: 'error', message: error.details[0].message });

	try {
		const { name, amount, account, bank, branch } = req.body;
		const user = req.user._id;

		const withdraw = new Withdraw({
			user,
			name,
			amount,
			account,
			bank,
			branch,
			status: 'requested',
		});

		const userAccount = await User.findById(user).select('_id earning');

		if (userAccount) {
			if (userAccount.earning < amount) {
				return res
					.status(500)
					.json({ status: 'error', message: 'Not Enough Balance' });
			}
			const newWithdraw = await withdraw.save();
			userAccount.earning = userAccount.earning - amount;
			const updated = await userAccount.save();

			generateNotification({
				user,
				details: `Your withdraw request of ${amount} NGN was received`,
				type: 'withdraw',
				target: newWithdraw._id,
				image: '/icon.png',
			});

			return res
				.status(201)
				.json({ status: 'created', doc: newWithdraw, updated: updated });
		} else {
			return res
				.status(500)
				.json({ status: 'error', message: 'User Not Found' });
		}
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

function validate(request) {
	const schema = Joi.object({
		name: Joi.string().required(),
		amount: Joi.number().integer().min(2000).required(),
		account: Joi.string().required(),
		bank: Joi.string().required(),
		branch: Joi.string(),
	});
	return schema.validate(request);
}

export default withdrawRequest;
