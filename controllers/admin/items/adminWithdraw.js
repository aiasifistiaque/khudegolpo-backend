import asyncHandler from 'express-async-handler';
import Withdraw from '../../../models/withdrawModel.js';

const adminWithdraw = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const doc = await Withdraw.findById(id).populate([
			{
				path: 'user',
				select: 'name username email walletBalance earning',
			},
		]);

		if (!doc) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Item not found' });
		}

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminWithdraw;
