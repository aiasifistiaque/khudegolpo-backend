import Book from '../../models/bookModel.js';
import asyncHandler from 'express-async-handler';
import countWords from '../../util/countWords.js';

const getBookById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;
	let viewer = 'reader';
	try {
		const toCount = await Book.findById(id)
			.select('chapters')
			.populate({ path: 'chapters', select: 'description' });

		const book = await Book.findById(id).populate([
			{
				path: 'author',
				select: '_id name username image',
			},
			{
				path: 'chapters',
				select: '_id title paid status earned',
				match: { status: { $ne: 'deleted' } },
			},
		]);
		if (book.author._id == userId) {
			viewer = 'self';
		}

		let words = 0;
		if (toCount.chapters != null) {
			toCount.chapters.map(chapter => {
				words = words + countWords(chapter.description);
			});
		}
		book.views = book.views ? book.views + 1 : 1;
		await book.save();

		res.status(200).json({ doc: book, viewer, words });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

export default getBookById;
