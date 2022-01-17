import asyncHandler from 'express-async-handler';
import Notification from '../../models/notificationModel.js';

const myNotifications = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;
	const user = req.user._id;

	try {
		const count = await Notification.countDocuments({ user });
		const pages = Math.ceil(count / perpage);
		const doc = await Notification.find({ user })
			.sort(sort)
			.limit(perpage)
			.skip(skip);

		doc.map(async item => {
			await Notification.updateOne({ _id: item._id }, { $set: { seen: true } });
		});
		res
			.status(200)
			.json({ doc, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default myNotifications;
