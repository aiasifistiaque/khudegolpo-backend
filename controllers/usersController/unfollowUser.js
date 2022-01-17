import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import Follow from '../../models/followerModel.js';

const unfollowUser = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const selectFromUser = '_id name username followers followings';

		const user = await User.findById(req.user._id).select(selectFromUser);
		const toUnfollow = await User.findById(id).select(selectFromUser);

		const ifFollowerExists = await Follow.findOne({
			user: req.user._id,
			following: id,
		});

		if (req.user._id == id) {
			return res
				.status(500)
				.json({ status: 'error', msg: 'you can not unfollow yourself' });
		}

		if (!toUnfollow || !user) {
			return res.status(404).json({ status: 'error', msg: 'user not found' });
		} else {
			if (ifFollowerExists) {
				const deletedEntry = await Follow.findByIdAndDelete(
					ifFollowerExists._id
				);
				if (deletedEntry) {
					toUnfollow.followers--;
					user.followings--;

					await user.save();
					await toUnfollow.save();
				}
				return res.status(200).json({
					status: 'deleted',
					deletedEntry,
					user,
					unfollowed: toUnfollow,
				});
			} else {
				return res
					.status(500)
					.json({ status: 'error', msg: 'process could not be completed' });
			}
		}
	} catch (e) {
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default unfollowUser;
