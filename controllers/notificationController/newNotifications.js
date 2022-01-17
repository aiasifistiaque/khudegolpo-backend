import asyncHandler from 'express-async-handler';
import Notification from '../../models/notificationModel.js';

const newNotifications = asyncHandler(async (req, res) => {
	const user = req.user._id;

	try {
		const doc = await Notification.findOne({ user, seen: false });

		if (doc) {
			res.status(200).json({ status: 1 });
		} else {
			res.status(200).json({ status: 0 });
		}
	} catch (error) {
		res.status(500).json({ message: error.message, status: 0 });
	}
});

export default newNotifications;
