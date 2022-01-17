import asyncHandler from 'express-async-handler';
import Refill from '../../models/refillModel.js';

const myRefills = asyncHandler(async (req, res) => {
	const user = req.user._id;
	const { page, sort, perpage, skip } = req;
	const status = req.query.status ? { status: req.query.status } : null;
	const type = req.query.type ? { type: req.query.type } : null;
	const options = { ...status, ...type };

	try {
		const count = await Refill.countDocuments({ user, ...options });
		const pages = Math.ceil(count / perpage);
		const refills = await Refill.find({
			user,
			...options,
		})
			.select('amount type status type createdAt')
			.sort(sort)
			.limit(perpage)
			.skip(skip);

		return res.status(200).json({
			status: 'success',
			doc: refills,
			count,
			pages,
			page: page,
			perpage,
		});
	} catch (e) {
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default myRefills;
