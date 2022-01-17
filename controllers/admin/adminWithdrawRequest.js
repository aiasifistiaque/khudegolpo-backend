import asyncHandler from 'express-async-handler';
import Withdraw from '../../models/withdrawModel.js';

const adminWithdrawRequests = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;

	try {
		const count = await Withdraw.countDocuments();
		const pages = Math.ceil(count / perpage);
		const doc = await Withdraw.find()
			.select('user amount type status createdAt')
			.populate({ path: 'user', select: 'username email' })
			.sort(sort)
			.limit(perpage)
			.skip(skip);
		res
			.status(200)
			.json({ doc, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminWithdrawRequests;
