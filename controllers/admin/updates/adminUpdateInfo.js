import asyncHandler from 'express-async-handler';
import Admin from '../../../models/adminModel.js';

const adminUpdateInfo = asyncHandler(async (req, res) => {
	const {
		coverOne,
		coverTwo,
		coverThree,
		coverOneRedirect,
		coverTwoRedirect,
		coverThreeRedirect,
	} = req.body;

	try {
		const data = await Admin.findOne();

		if (!data) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Item not found' });
		}

		data.coverOne = coverOne;
		data.coverTwo = coverTwo;
		data.coverThree = coverThree;
		data.coverOneRedirect = coverOneRedirect;
		data.coverTwoRedirect = coverTwoRedirect;
		data.coverThreeRedirect = coverThreeRedirect;

		const doc = await data.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminUpdateInfo;
