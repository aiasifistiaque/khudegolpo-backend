import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import bcrypt from 'bcrypt';

const changePassword = asyncHandler(async (req, res) => {
	const { password, newpass } = req.body;
	try {
		const user = await User.findById(req.user._id);
		if (!user) return res.status(400).json({ messagen: 'User not found' });

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword)
			return res.status(400).json({ message: 'Wrong password' });

		if (req.body.password == newpass) {
			return res
				.status(400)
				.json({ message: `Your old password can't by your new password` });
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newpass, salt);
		user.resetCode = null;

		const savedUser = await user.save();
		res.status(200).json({ message: 'Password changed Successfully' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: e.message });
	}
});

export default changePassword;
