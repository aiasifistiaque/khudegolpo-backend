import asyncHandler from 'express-async-handler';
import Refill from '../../models/refillModel.js';
import { User } from '../../models/userModel.js';
import generateNotification from '../notificationController/generateNotification.js';

const refillRequest = asyncHandler(async (req, res) => {
	const { name, type, target, from, date, amount } = req.body;
	const user = req.user._id;

	try {
		const refill = new Refill({
			user,
			name,
			type,
			target,
			from,
			date,
			amount,
			status: type == 'paystack' ? 'Completed' : 'Requested',
		});

		const refillRequested = await refill.save();

		if (type == 'paystack') {
			const self = await User.findById(user);
			self.walletBalance = self.walletBalance + amount;
			self.save();
		}

		const details =
			type == 'paystack'
				? `Your account was successfully refilled with ${amount} BDT`
				: `Your account refill request for ${amount} BDT was received`;

		generateNotification({
			user,
			details,
			type: 'refill',
			target: refillRequested._id,
			image: '/icon.png',
		});

		return res.status(201).json({ status: 'created', doc: refillRequested });
	} catch (e) {
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default refillRequest;
