import Chapter from '../../models/chapterModel.js';
import asyncHandler from 'express-async-handler';
import * as lib from '../../lib/lib.js';

const chapterInfoController = asyncHandler(async (req, res) => {
	try {
		const chapter = await Chapter.findById(req.params.id)
			.select('image description book price title')
			.populate({
				path: 'book',
				select: 'image author title',
				populate: { path: 'author', select: 'name username image' },
			});

		if (!chapter)
			return res.status(404).json({ status: 'error', message: error.message });

		const doc = {
			title: chapter.title,
			image: chapter.book.image,
			book: chapter.book.title,
			description: lib.stripHtml(lib.textShorten(chapter.description, 100)),
			author: chapter.book.author.username,
		};

		res.status(200).json({ status: 'success', doc });
	} catch (error) {
		res.status(404).json({ status: 'error', message: error.message });
	}
});

export default chapterInfoController;
