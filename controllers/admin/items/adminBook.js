import asyncHandler from 'express-async-handler';
import Book from '../../../models/bookModel.js';

const adminBook = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const doc = await Book.findById(id).populate([
			{
				path: 'author',
				select: 'name username email',
			},
			{
				path: 'chapters',
			},
		]);

		if (!doc) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Book not found' });
		}

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminBook;
