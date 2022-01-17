import asyncHandler from 'express-async-handler';
import Unlock from '../../models/unlockModel.js';

const adminUnlocks = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;

	try {
		const count = await Unlock.countDocuments();
		const pages = Math.ceil(count / perpage);
		const doc = await Unlock.find()
			.sort(sort)
			.populate([
				{ path: 'user', select: 'name' },
				{ path: 'book', select: 'title image' },
				{ path: 'chapter', select: 'title' },
				{ path: 'author', select: 'name username' },
			])
			.limit(perpage)
			.skip(skip);
		res
			.status(200)
			.json({ doc, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminUnlocks;
