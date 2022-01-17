import asyncHandler from 'express-async-handler';
import Book from '../../models/bookModel.js';

const adminBooks = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;

	try {
		const count = await Book.countDocuments();
		const pages = Math.ceil(count / perpage);
		const doc = await Book.find()
			.sort(sort)
			.select('-description')
			.populate({ path: 'author', select: 'name username' })
			.limit(perpage)
			.skip(skip);
		res
			.status(200)
			.json({ doc, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminBooks;
