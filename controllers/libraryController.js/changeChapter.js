import asyncHandler from 'express-async-handler';
import Library from '../../models/libraryModel.js';

const changeChapter = asyncHandler(async (req, res) => {
	const { book, chapter } = req.body;

	try {
		const update = await Library.findOne({ user: req.user._id, book });
		update.currentChapter = chapter;
		const changedItem = await update.save();
		res.status(200).json({ status: 'updated', book: changedItem });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default changeChapter;
