import asyncHandler from 'express-async-handler';
import Report from '../../../models/reportModel.js';

const resolveIssue = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const report = await Report.findById(id);

		if (!report) {
			return res.status(400).json({ status: 'error', msg: 'Report not found' });
		} else {
			report.status = status;
			const updated = await report.save();
			return res.status(200).json({
				status: 'updated',
				doc: updated,
			});
		}

		r;
	} catch (e) {
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default resolveIssue;
