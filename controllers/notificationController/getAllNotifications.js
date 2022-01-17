import asyncHandler from 'express-async-handler';
import Notification from '../../models/notificationModel.js';

const getAllNotifications = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;

	try {
		const count = await Notification.countDocuments();
		const pages = Math.ceil(count / perpage);
		const doc = await Notification.find().sort(sort).limit(perpage).skip(skip);
		res
			.status(200)
			.json({ doc, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default getAllNotifications;
