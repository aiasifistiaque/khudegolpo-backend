import Book from '../../models/bookModel.js';
import asyncHandler from 'express-async-handler';
import * as lib from '../../lib/lib.js';

const bookInfoController = asyncHandler(async (req, res) => {
	try {
		const book = await Book.findById(req.params.id)
			.select('author title image description')
			.populate([
				{
					path: 'author',
					select: '_id username image',
				},
			]);

		if (!book)
			return res
				.status(404)
				.json({ status: 'error', message: 'book not found' });

		const doc = {
			_id: book._id,
			title: book.title,
			author: book.author,
			image: book.image,
			description: lib.stripHtml(book.description),
		};

		res.status(200).json({ status: 'success', doc });
	} catch (error) {
		res.status(404).json({ status: 'error', message: error.message });
	}
});

export default bookInfoController;
