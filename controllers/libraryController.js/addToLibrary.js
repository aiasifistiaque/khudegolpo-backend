import asyncHandler from 'express-async-handler';
import Library from '../../models/libraryModel.js';
import Book from '../../models/bookModel.js';

const addToLibrary = asyncHandler(async (req, res) => {
	const { book, status } = req.body;
	const bookStatus = status || 'Added';

	try {
		const bookToAdd = await Book.findById(book);

		if (!bookToAdd) {
			return res.status(404).json({ status: 'error', msg: 'Book Not Found' });
		}

		const ifExist = await Library.findOne({
			user: req.user._id,
			book: book,
			status: 'Added',
		});

		if (ifExist && bookStatus == 'Added') {
			return res.status(500).json({
				status: 'error',
				message: 'Book Already Exists in your library',
			});
		} else if (!ifExist && bookStatus != 'Added') {
			return res.status(500).json({
				status: 'error',
				message: 'Book Not Found',
			});
		} else {
			const libraryItem = new Library({
				user: req.user._id,
				book,
				status: status ? status : 'Added',
				currentChapter: bookToAdd.chapters[0],
			});
			if (bookStatus == 'Added') {
				const addedItem = await libraryItem.save();
				return res.status(201).json({ status: 'created', doc: addedItem });
			} else {
				ifExist.status = bookStatus;
				const changed = await ifExist.save();
				return res.status(200).json({ status: 'modified', doc: changed });
			}
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', message: e.message });
	}
});

export default addToLibrary;
