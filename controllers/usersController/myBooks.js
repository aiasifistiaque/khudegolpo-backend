import asyncHandler from 'express-async-handler';
import Book from '../../models/bookModel.js';

const myBooks = asyncHandler(async (req, res) => {
	const author = req.user._id;
	const options = req.query.status
		? { author, status: req.query.status }
		: { author };
	const perPage = parseInt(req.query.perpage) || 10;
	const page = parseInt(req.query.page) - 1 || 0;

	try {
		const count = await Book.countDocuments({
			status: { $nin: ['banned', 'deleted'] },
			...options,
		});
		const pages = Math.ceil(count / perPage);
		const doc = await Book.find({
			status: { $nin: ['banned', 'deleted'] },
			...options,
		})
			.sort('-createdAt')
			.select('-description -author -tags -chapters -likes')
			.skip(page * perPage)
			.limit(perPage);

		return res
			.status(200)
			.json({ status: 'success', doc, count, page: page + 1, perPage, pages });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default myBooks;
