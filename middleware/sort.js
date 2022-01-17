export function sort(req, res, next) {
	const sort = req.query.sort ? req.query.sort : '-createdAt';
	const page = req.query.page
		? req.query.page > 0
			? parseInt(req.query.page)
			: 1
		: 1;
	const perpage = req.query.perpage ? parseInt(req.query.perpage) : 20;

	req.sort = sort;
	req.page = page;
	req.perpage = perpage;
	req.skip = (page - 1) * perpage;
	next();
}
