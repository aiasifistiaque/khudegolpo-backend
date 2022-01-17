import asyncHandler from 'express-async-handler';
import Book from '../../models/bookModel.js';

const editBook = asyncHandler(async (req, res) => {
	const user = req.user._id;
	const {
		image,
		title,
		description,
		genre,
		id,
		language,
		type,
		rating,
		tags,
		platform,
		status,
	} = req.body;

	try {
		const book = await Book.findById(id);

		if (book) {
			if (book.author != user) {
				return res.status(401).json({
					status: 'error',
					message: 'Access Denied. You are not allowerd to perform this action',
				});
			}

			book.image = image;
			book.title = title;
			book.description = description;
			book.genre = genre;
			book.language = language;
			book.rating = rating;
			book.platform = platform;
			book.type = type;
			book.tags = tags;
			book.status = status;

			const saved = await book.save();
			res.status(200).json({ status: 'created', doc: saved });
		} else {
			res.status(404).json({ status: 'error', message: 'book not found' });
		}
	} catch (e) {
		res.status(500).json({ status: 'error', message: e.message });
	}
});

export default editBook;
