import Comment from '../../models/commentModel.js';
import asyncHandler from 'express-async-handler';

const getCommentById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const doc = await Comment.findById(id);

		if (!doc) {
			return res
				.status(500)
				.json({ status: 'Error', message: 'Comment not found' });
		}

		res.status(200).json({ doc, status: 'success' });
	} catch (e) {
		console.log(e);
		return res.status(500).send({ status: 'Error', message: e.message });
	}
});

export default getCommentById;
