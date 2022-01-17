import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import Follow from '../../models/followerModel.js';
import generateNotification from '../notificationController/generateNotification.js';

const followUser = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const follow = new Follow({
			user: req.user._id,
			following: id,
		});

		const selectFromUser = '_id name username followers followings image';

		const user = await User.findById(req.user._id).select(selectFromUser);
		const toFollow = await User.findById(id).select(selectFromUser);

		const ifFollowerExists = await Follow.findOne({
			user: req.user._id,
			following: id,
		});

		if (req.user._id == id) {
			return res
				.status(500)
				.json({ status: 'error', message: 'you can not follow yourself' });
		}

		if (!toFollow || !user) {
			return res
				.status(404)
				.json({ status: 'error', message: 'user not found' });
		} else {
			if (!ifFollowerExists) {
				const newFollow = await follow.save();
				if (newFollow) {
					toFollow.followers++;
					user.followings++;

					await user.save();
					await toFollow.save();
				}
				generateNotification({
					user: id,
					details: `${user.username} started following you`,
					image: user.image,
					type: 'follow',
					target: user.username,
				});

				return res.status(201).json({
					status: 'created',
					doc: newFollow,
					user,
					follower: toFollow,
				});
			} else {
				return res
					.status(500)
					.json({ status: 'error', message: 'you already follow this user' });
			}
		}
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default followUser;
