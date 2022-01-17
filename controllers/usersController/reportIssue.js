import asyncHandler from 'express-async-handler';
import Report from '../../models/reportModel.js';

const reportIssue = asyncHandler(async (req, res) => {
	const { details, type, target, category } = req.body;
	const user = req.user._id;

	try {
		const report = new Report({
			user,
			details,
			type,
			target,
			category,
		});

		const createdReport = await report.save();

		return res.status(201).json({ status: 'created', doc: createdReport });
	} catch (e) {
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default reportIssue;
