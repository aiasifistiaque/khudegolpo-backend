import asyncHandler from 'express-async-handler';
import Chapter from '../../../models/chapterModel.js';

const adminChapter = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const doc = await Chapter.findById(id).populate([
			{
				path: 'author',
				select: 'name username email',
			},
			{ path: 'book', populate: { path: 'author', select: 'username' } },
		]);

		if (!doc) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Chapter not found' });
		}

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminChapter;
