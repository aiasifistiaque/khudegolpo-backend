import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import Book from '../../models/bookModel.js';
import Follower from '../../models/followerModel.js';

const getOtherUser = asyncHandler(async (req, res) => {
	const from = req.user._id;
	const { id } = req.params;

	try {
		const user = await User.findOne({ username: id }).select(
			'_id name username description followers followings image'
		);

		if (!user)
			return res
				.status(500)
				.json({ status: 'error', message: 'user not found' });

		const books = await Book.find({
			author: user._id,
			status: 'published',
			chapters: { $exists: true, $not: { $size: 0 } },
		}).select('title image genre chapters');

		const follow = await Follower.findOne({ user: from, following: user._id });

		return res.status(200).json({
			status: 'success',
			doc: user,
			books,
			follow: from == user._id ? 2 : follow ? 1 : 0,
		});
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getOtherUser;
