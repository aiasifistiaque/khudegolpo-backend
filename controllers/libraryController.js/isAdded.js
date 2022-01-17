import asyncHandler from 'express-async-handler';
import Library from '../../models/libraryModel.js';

const isAdded = asyncHandler(async (req, res) => {
	const user = req.user._id;
	const { book } = req.params;
	try {
		const doc = await Library.find({ user: user, book, status: 'Added' });
		if (doc.length > 0) {
			return res.status(200).json({ status: 'success', found: 1, doc });
		} else {
			return res.status(200).json({ status: 'fail', found: 0 });
		}
	} catch (e) {
		return res.status(500).json({ message: 'There was an error' });
	}
});

export default isAdded;
