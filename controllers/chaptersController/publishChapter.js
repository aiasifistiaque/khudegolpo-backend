import asyncHandler from 'express-async-handler';
import Chapter from '../../models/chapterModel.js';

const publishChapter = asyncHandler(async (req, res) => {
	const { id, status } = req.body;
	const author = req.user._id;

	try {
		const chapter = await Chapter.findById(id).populate({
			path: 'book',
			select: 'author',
		});
		if (chapter.book.author != author) {
			return res.status(500).json({
				status: 'error',
				message: 'You are not authorized to perform this action',
			});
		}
		chapter.status = status;
		const saved = await chapter.save();
		return res.status(200).json({ status: 'success', doc: saved });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default publishChapter;
