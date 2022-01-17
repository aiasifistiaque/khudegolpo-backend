import asyncHandler from 'express-async-handler';
import Joi from 'joi';
import Report from '../../../models/reportModel.js';

const adminChangeReportStatus = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: 'error', message: error.details[0].message });

		const item = await Report.findById(id);

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
			.valid(
				'requested',
				'resolved',
				'processing',
				'pending',
				'rejected',
				'completed',
				'banned'
			)
			.required(),
	});
	return schema.validate(item);
};

export default adminChangeReportStatus;
