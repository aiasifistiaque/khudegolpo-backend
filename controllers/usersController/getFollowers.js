import Follow from '../../models/followerModel.js';
import asyncHandler from 'express-async-handler';

const getFollowers = asyncHandler(async (req, res) => {
	//const { sort, page, perPage } = req.body;

	let sort = req.query.sort || 'newest';
	let option = '-createdAt';

	if (sort == 'newest') option = '-createdAt';
	else if (sort == 'oldest') option = 'createdAt';

	try {
		const followingsCount = await Follow.countDocuments({ user: req.user._id });
		const followersCount = await Follow.countDocuments({
			following: req.user._id,
		});

		const followings = await Follow.find({ user: req.user._id })
			.select('following')
			.populate('following', '_id image name username followers followings')
			.sort(option);
		const followers = await Follow.find({ following: req.user._id })
			.populate('user', '_id image name username followers followings')
			.sort(option);

		res.status(200).json({
			followings,
			followers,
			followingsCount,
			followersCount,
		});
	} catch (e) {
		return res.status(500).json('There was an error');
	}
});

export default getFollowers;
