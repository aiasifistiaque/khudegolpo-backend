import asyncHandler from 'express-async-handler';
import Refill from '../../models/refillModel.js';

const adminRefillRequests = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;

	try {
		const count = await Refill.countDocuments();
		const pages = Math.ceil(count / perpage);
		const doc = await Refill.find()
			.select('user amount type status date createdAt')
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

export default adminRefillRequests;
