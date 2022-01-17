import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const removePushToken = asyncHandler(async (req, res) => {
	try {
		const id = req.user._id;

		const user = await User.findById(id).select('expoToken');

		if (!user) return res.status(400).json({ message: 'User not found' });

		user.expoToken = null;

		const saved = await user.save();

		return res.status(200).json({ status: 'updated', doc: saved });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

export default removePushToken;
