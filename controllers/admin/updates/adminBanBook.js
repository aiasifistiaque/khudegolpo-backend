import asyncHandler from 'express-async-handler';
import Book from '../../../models/bookModel.js';
import Joi from 'joi';

const adminBanBook = asyncHandler(async (req, res) => {
	const { status } = req.body;
	const { id } = req.params;
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: 'error', message: error.details[0].message });

		const book = await Book.findById(id).populate();

		if (!book) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Book not found' });
		}

		book.status = status;

		const doc = await book.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

const validate = item => {
	const schema = Joi.object({
		status: Joi.string()
			.valid('banned', 'published', 'unpublished', 'deleted', 'flagged')
			.required(),
	});
	return schema.validate(item);
};

export default adminBanBook;
