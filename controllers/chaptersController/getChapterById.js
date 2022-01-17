import Chapter from '../../models/chapterModel.js';
import asyncHandler from 'express-async-handler';

const getChapterById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = req.user._id;
	let viewer = 'viewer';
	try {
		const chapter = await Chapter.findById(id).populate({
			path: 'book',
			populate: [
				{
					path: 'chapters',
					select: '_id title',
					match: { status: 'published' },
				},
				{ path: 'author', select: '_id name' },
			],
		});
		if (chapter.book.author._id == user) {
			viewer = 'self';
		}

		chapter.views = chapter.views ? chapter.views + 1 : 1;
		await chapter.save();

		res.status(200).json({ doc: chapter, viewer });
	} catch (error) {
		res.status(404).send({ message: `Chapter #${id} not found` });
	}
});

export default getChapterById;
