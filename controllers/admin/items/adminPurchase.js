import asyncHandler from 'express-async-handler';
import Unlock from '../../../models/unlockModel.js';

const adminPurchase = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const doc = await Unlock.findById(id).populate([
			{
				path: 'user',
				select: '-password',
			},
			{ path: 'book' },
			{ path: 'chapter' },
			{ path: 'author', select: 'username' },
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

export default adminPurchase;
