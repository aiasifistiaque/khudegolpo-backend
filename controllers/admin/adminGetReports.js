import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import Report from '../../models/reportModel.js';

const adminGetReports = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;

	try {
		const count = await Report.countDocuments();
		const pages = Math.ceil(count / perpage);
		const users = await Report.find().limit(perpage).skip(skip);
		res
			.status(200)
			.json({ doc: users, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminGetReports;
