import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const getSelf = asyncHandler(async (req, res) => {
	console.log('req is here');
	const id = req.user._id;

	try {
		const user = await User.findById(id).select('-password');

		return res.status(200).json({
			status: 'success',
			doc: user,
		});
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getSelf;
