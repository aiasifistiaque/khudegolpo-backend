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
		bookOne,
		bookTwo,
		bookThree,
		bookFour,
		bookFive,
		bookSix,
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
		data.bookOne = bookOne;
		data.bookTwo = bookTwo;
		data.bookThree = bookThree;
		data.bookFour = bookFour;
		data.bookFive = bookFive;
		data.bookSix = bookSix;

		const doc = await data.save();
		if (doc) {
			const updatedData = await Admin.findOne().populate(
				'bookOne bookTwo bookThree bookFour bookFive bookSix'
			);
			res.status(200).json({ doc: updatedData, status: 'success' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		console.log(error.message);
	}
});

export default adminUpdateInfo;
