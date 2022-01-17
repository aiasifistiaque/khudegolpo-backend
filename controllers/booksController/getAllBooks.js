import Book from '../../models/bookModel.js';
import asyncHandler from 'express-async-handler';
import { books } from '../../constants.js';

const getAllBooks = asyncHandler(async (req, res) => {
	//const { sort, page, perPage } = req.body;

	let sort = 'views';
	const option = req.query.sort;
	const perPage = parseInt(req.query.perpage) || books.perpage;
	const page = parseInt(req.query.page) - 1 || 0;

	let genre = req.query.search
		? { title: { $regex: req.query.search, $options: 'i' } }
		: req.query.genre && req.query.paid
		? { genre: req.query.genre, type: req.query.paid }
		: req.query.genre
		? { genre: req.query.genre }
		: req.query.paid
		? { type: req.query.paid }
		: {};

	if (option == 'newest') sort = '-createdAt';
	else if (option == 'oldest') sort = 'createdAt';
	else if (option == 'nameAsc') sort = 'title';
	else if (option == 'nameDsc') sort = '-title';
	else if (option == 'popular') sort = '-views';

	let select = '';

	let populate = [
		{ path: 'chapters', select: 'title' },
		{ path: 'author', select: '_id name username' },
	];

	if (req.query.type == 'home') {
		console.log('home');
		select = '_id title image createdAt tags description type tags chapters';
		populate = [];
	}

	try {
		const count = await Book.countDocuments({ status: 'published', ...genre });
		const totalPages = Math.ceil(count / perPage);
		const books = await Book.find({ status: 'published', ...genre })
			.select(select)
			.populate(populate)
			.sort(sort)
			.skip(page * perPage)
			.limit(perPage);
		res.status(200).json({ books, count, perPage, page: page + 1, totalPages });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: 'There was an error' });
	}
});

export default getAllBooks;
