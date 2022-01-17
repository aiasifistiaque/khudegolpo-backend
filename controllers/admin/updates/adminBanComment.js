import asyncHandler from 'express-async-handler';
import Comment from '../../../models/commentModel.js';

const adminBanComment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const item = await Comment.findById(id);

		if (!item) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Comment not found' });
		}

		item.status = 'banned';

		const doc = await item.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ status: 'error', message: error.message });
	}
});

export default adminBanComment;
