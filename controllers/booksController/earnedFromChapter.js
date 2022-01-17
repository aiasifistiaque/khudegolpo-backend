import asyncHandler from 'express-async-handler';
import Unlock from '../../models/unlockModel.js';
import Book from '../../models/bookModel.js';
import Chapter from '../../models/chapterModel.js';

const earnedFromChapter = asyncHandler(async (req, res) => {
	const { id } = req.params;
	let earned = 0;

	try {
		const doc = await Chapter.findById(id).select('-book');
		if (!doc) return res.status(500).json({ message: 'Book not found' });

		const count = await Unlock.countDocuments({ chapter: id }).populate();
		const items = await Unlock.find({ chapter: id }).select('price createdAt');

		items.map(i => (earned += i.price));

		res.status(200).json({
			status: 'success',
			doc,
			earned: (earned * (100 - process.env.COMMISSION)) / 100,
			sales: count,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default earnedFromChapter;
