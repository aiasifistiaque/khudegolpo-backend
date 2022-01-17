import asyncHandler from 'express-async-handler';
import Chapter from '../../../models/chapterModel.js';
import Joi from 'joi';

const adminBanChapter = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: 'error', message: error.details[0].message });
		const item = await Chapter.findById(id).populate({
			path: 'book',
			select: 'author title',
			populate: { path: 'author', select: 'username' },
		});

		if (!item) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Item not found' });
		}

		item.status = status;

		const doc = await item.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

const validate = item => {
	const schema = Joi.object({
		status: Joi.string()
			.valid('banned', 'published', 'unpublished', 'deleted', 'flagged')
			.required(),
	});
	return schema.validate(item);
};

export default adminBanChapter;
