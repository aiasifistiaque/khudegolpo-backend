import asyncHandler from 'express-async-handler';
import Admin from '../../models/adminModel.js';

const coverInfo = asyncHandler(async (req, res) => {
	try {
		const data = await Admin.findOne().select(
			'coverOne coverTwo coverThree coverOneRedirect coverTwoRedirect coverThreeRedirect'
		);

		if (!data) {
			return res.status(500).json({ status: 'error', message: 'not found' });
		}
		const doc = [
			{ src: data.coverOne, href: data.coverOneRedirect },
			{ src: data.coverTwo, href: data.coverTwoRedirect },
			{ src: data.coverThree, href: data.coverThreeRedirect },
		];
		res.status(200).json({ doc: doc });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default coverInfo;
