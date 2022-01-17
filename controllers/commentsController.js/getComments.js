import Comment from '../../models/commentModel.js';
import asyncHandler from 'express-async-handler';
import { comments } from '../../constants.js';

const getComments = asyncHandler(async (req, res) => {
	//const { sort, page, perPage } = req.body;

	let sort = comments.sort;
	const option = req.query.sort;
	const perPage = parseInt(req.query.perpage) || comments.perpage;
	const page = parseInt(req.query.page) - 1 || 0;

	let type =
		req.query.type == 'chapter'
			? { chapter: req.query.id }
			: { book: req.query.id };

	if (option == 'newest') sort = '-createdAt';
	else if (option == 'oldest') sort = 'createdAt';

	try {
		const count = await Comment.countDocuments({
			status: { $ne: 'banned' },
			...type,
		});
		const totalPages = Math.ceil(count / perPage);
		const data = await Comment.find({ status: { $ne: 'banned' }, ...type })
			.populate([
				{ path: 'user', select: 'name username image' },
				{ path: 'book', select: 'title' },
				{ path: 'chapter', select: 'title' },
			])
			.sort(sort)
			.skip(page * perPage)
			.limit(perPage);
		res
			.status(200)
			.json({ doc: data, count, perPage, page: page + 1, totalPages });
	} catch (e) {
		console.log(e);
		return res.status(500).send({ message: 'There was an error' });
	}
});

export default getComments;
