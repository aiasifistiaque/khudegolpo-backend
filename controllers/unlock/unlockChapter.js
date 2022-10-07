import Chapter from '../../models/chapterModel.js';
import asyncHandler from 'express-async-handler';
import Unlock from '../../models/unlockModel.js';
import { User } from '../../models/userModel.js';
import Book from '../../models/bookModel.js';
import generateNotification from '../notificationController/generateNotification.js';

const unlockChapter = asyncHandler(async (req, res) => {
	const { id } = req.body;
	const userId = req.user._id;

	try {
		const doesExist = await Unlock.findOne({ chapter: id, user: userId });
		if (doesExist) {
			return res
				.status(500)
				.json({ message: 'You have already purchased this chapter' });
		} else {
			const chapter = await Chapter.findById(id).populate({
				path: 'book',
				populate: { path: 'chapters', select: '_id author title' },
			});
			if (!chapter) {
				return res.status(404).json({ message: 'Chapter not found' });
			}

			if (!chapter) {
				return res.status(404).json({ message: 'Chapter not found' });
			}

			if (chapter.paid != true) {
				return res.status(500).json({ message: 'Chapter is not for sale' });
			}
			if (chapter.book.author == userId) {
				return res
					.status(500)
					.json({ message: 'You can not buy your own book' });
			}

			const book = await Book.findById(chapter.book._id);
			if (!book) {
				return res.status(404).json({ message: 'Book not found' });
			}

			const buyer = await User.findById(userId).select('-password');
			const author = await User.findById(chapter.book.author).select(
				'-password'
			);

			if (!buyer || !author) {
				return res.status(404).json({ message: 'User not found' });
			}

			if (buyer && buyer.walletBalance < chapter.price) {
				return res
					.status(500)
					.json({ message: 'Not enough balance, please Refill' });
			} else {
				const unlock = new Unlock({
					chapter: id,
					book: book._id,
					author: chapter.book.author,
					price: chapter.price,
					user: buyer._id,
				});
				const created = await unlock.save();
				if (created) {
					const earning =
						chapter.price - (chapter.price * process.env.COMMISSION) / 100;
					author.earning = author.earning + earning;
					buyer.walletBalance = buyer.walletBalance - chapter.price;
					chapter.earned = chapter.earned ? chapter.earned + earning : earning;
					book.earned = book.earned ? book.earned + earning : earning;
					await buyer.save();
					await author.save();
					await chapter.save();
					await book.save();

					generateNotification({
						user: author._id,
						details: `${buyer.username} purchased Chapter: ${chapter.title} for ${chapter.price} BDT of your book ${book.title}`,
						type: 'unlock',
						target: chapter._id,
						image: buyer.image,
					});

					return res.status(201).json({ doc: created });
				} else {
					res.status(500).json({ message: 'Could not be added' });
				}
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default unlockChapter;
