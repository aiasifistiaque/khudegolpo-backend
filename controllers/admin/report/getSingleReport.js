import asyncHandler from 'express-async-handler';
import Report from '../../../models/reportModel.js';

const getSingleReport = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const report = await Report.findById(id);

		if (!report) {
			return res.status(400).json({ status: 'error', msg: 'Report not found' });
		} else {
			return res.status(200).json({
				status: 'success',
				doc: report,
			});
		}

		r;
	} catch (e) {
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default getSingleReport;
