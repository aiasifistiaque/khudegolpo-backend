import asyncHandler from 'express-async-handler';
import Book from '../../models/bookModel.js';

const adminPaidBooks = asyncHandler(async (req, res) => {
	const { page, sort, perpage, skip } = req;

	try {
		const count = await Book.countDocuments({
			$or: [{ type: 'paid' }, { type: 'Paid' }],
		});
		const pages = Math.ceil(count / perpage);
		const doc = await Book.find({ $or: [{ type: 'paid' }, { type: 'Paid' }] })
			.sort(sort)
			.select('-description')
			.limit(perpage)
			.skip(skip);
		res
			.status(200)
			.json({ doc, status: 'success', count, page, pages, perpage });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminPaidBooks;
