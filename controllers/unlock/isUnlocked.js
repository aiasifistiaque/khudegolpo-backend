import asyncHandler from 'express-async-handler';
import Unlock from '../../models/unlockModel.js';
import Chapter from '../../models/chapterModel.js';

const isUnlocked = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const chapter = await Chapter.findById(id).populate({
			path: 'book',
			select: 'author',
		});

		if (chapter.book.author == userId) {
			return res.status(200).json({ unlocked: 1 });
		} else {
			const purchased = await Unlock.findOne({
				user: userId,
				chapter: id,
			});
			if (purchased) {
				return res.status(200).json({ unlocked: 1 });
			} else {
				return res.status(200).json({ unlocked: 0 });
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default isUnlocked;
