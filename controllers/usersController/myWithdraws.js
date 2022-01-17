import asyncHandler from 'express-async-handler';
import Withdraw from '../../models/withdrawModel.js';

const myWithdraws = asyncHandler(async (req, res) => {
	const user = req.user._id;
	const { page, sort, perpage, skip } = req;
	const status = req.query.status ? { status: req.query.status } : null;

	const options = { ...status };

	try {
		const count = await Withdraw.countDocuments({ user, ...options });
		const pages = Math.ceil(count / perpage);
		const withdraws = await Withdraw.find({ user, ...options })
			.select('amount status createdAt ')
			.sort(sort)
			.limit(perpage)
			.skip(skip);

		return res
			.status(200)
			.json({ status: 'success', doc: withdraws, pages, page, perpage, count });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default myWithdraws;
