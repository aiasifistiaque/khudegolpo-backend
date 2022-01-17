import asyncHandler from 'express-async-handler';
import { User } from '../../../models/userModel.js';
import Book from '../../../models/bookModel.js';
import Withdraw from '../../../models/withdrawModel.js';
import Unlock from '../../../models/unlockModel.js';
import Refill from '../../../models/refillModel.js';

const adminUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const doc = await User.findById(id).select('-password');

		if (!doc) {
			return res
				.status(500)
				.json({ status: 'error', message: 'User not found' });
		}

		const books = await Book.find({ author: id }).select(
			'title image chapters status views choice'
		);
		const withdraws = await Withdraw.find({ user: id })
			.populate({ path: 'user', select: 'username' })
			.sort('-createdAt');
		const refills = await Refill.find({ user: id })
			.select('user amount type status date createdAt')
			.sort('-createdAt');
		const unlocks = await Unlock.find({ user: id })
			.sort('-createdAt')
			.populate([
				{ path: 'user', select: 'name' },
				{ path: 'book', select: 'title image' },
				{ path: 'chapter', select: 'title' },
				{ path: 'author', select: 'name username' },
			]);

		res
			.status(200)
			.json({ doc, status: 'success', books, withdraws, refills, unlocks });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminUser;
