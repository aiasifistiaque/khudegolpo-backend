import asyncHandler from 'express-async-handler';
import Unlock from '../../models/unlockModel.js';

const myUnlocks = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { page, sort, perpage, skip } = req;

	try {
		const count = await Unlock.countDocuments({ user: userId });
		const pages = Math.ceil(count / perpage);
		const unlocks = await Unlock.find({ user: userId })
			.populate([
				{ path: 'chapter', select: '_id title' },
				{ path: 'book', select: '_id title image' },
				{ path: 'author', select: '_id name' },
			])
			.sort(sort)
			.limit(perpage)
			.skip(skip);
		res
			.status(200)
			.json({ doc: unlocks, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default myUnlocks;
