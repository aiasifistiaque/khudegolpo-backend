import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const adminGetUsers = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;

	try {
		const count = await User.countDocuments();
		const pages = Math.ceil(count / perpage);
		const users = await User.find()
			.select('-password -followers -followings -resetCode')
			.sort(sort)
			.limit(perpage)
			.skip(skip);
		res
			.status(200)
			.json({ doc: users, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminGetUsers;
