import asyncHandler from 'express-async-handler';
import Chapter from '../../models/chapterModel.js';

const editChapter = asyncHandler(async (req, res) => {
	const { title, description, paid, price, id } = req.body;
	console.log(req.body);

	try {
		const chapter = await Chapter.findById(id);

		if (chapter) {
			chapter.title = title;
			chapter.description = description;
			chapter.paid = paid;
			chapter.price = price;
			const saved = await chapter.save();
			res.status(200).json({ status: 'created', doc: saved });
		} else {
			res.status(404).json({ status: 'error', message: 'chapter not found' });
		}
	} catch (e) {
		res.status(500).json({ status: 'error', message: e.message });
	}
});

export default editChapter;
