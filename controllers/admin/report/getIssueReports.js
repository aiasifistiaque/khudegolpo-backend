import asyncHandler from 'express-async-handler';
import Report from '../../../models/reportModel.js';

const getIssueReports = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	let queryOption = {};

	if (req.query.sort == 'newest') sort = '-createdAt';
	else if (req.query.sort == 'oldest') sort = 'createdAt';

	console.log(req.query.status);

	if (req.query.status) {
		queryOption = { status: req.query.status };
	}

	const perPage = parseInt(req.query.perpage) || 25;
	const page = parseInt(req.query.page) - 1 || 0;

	try {
		const count = await Report.countDocuments(queryOption);
		const totalPages = Math.ceil(count / perPage);

		const reports = await Report.find(queryOption)
			.sort(sort)
			.skip(page * perPage)
			.limit(perPage);

		return res.status(200).json({
			status: 'success',
			doc: reports,
			count,
			perPage,
			page: page + 1,
			totalPages,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default getIssueReports;
