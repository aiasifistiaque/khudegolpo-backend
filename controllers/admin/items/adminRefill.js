import asyncHandler from 'express-async-handler';
import Refill from '../../../models/refillModel.js';

const adminRefill = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const doc = await Refill.findById(id).populate([
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

export default adminRefill;
