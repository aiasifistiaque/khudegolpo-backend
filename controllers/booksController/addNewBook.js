import asyncHandler from 'express-async-handler';
import Book from '../../models/bookModel.js';

const addNewBook = asyncHandler(async (req, res) => {
	const {
		title,
		image,
		description,
		tags,
		genre,
		language,
		type,
		rating,
		platform,
	} = req.body;

	const author = req.user._id;

	try {
		const book = new Book({
			title,
			image,
			description,
			author,
			tags,
			genre,
			language,
			type,
			rating,
			platform,
			earned: 0,
		});

		const addBook = await book.save();
		res.status(201).json({ status: 'created', doc: addBook });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', message: e.message });
	}
});

export default addNewBook;
