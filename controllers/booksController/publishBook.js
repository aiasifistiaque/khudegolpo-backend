import asyncHandler from 'express-async-handler';
import Book from '../../models/bookModel.js';

const publishBook = asyncHandler(async (req, res) => {
	const { id, status } = req.body;
	const author = req.user._id;

	try {
		const book = await Book.findById(id);
		if (book.author != author) {
			return res.status(500).json({
				status: 'error',
				message: 'You are not authorized to perform this action',
			});
		}
		book.status = status;
		const saved = await book.save();
		return res.status(200).json({ status: 'success', doc: saved });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default publishBook;
