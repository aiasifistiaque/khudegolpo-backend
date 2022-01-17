import asyncHandler from 'express-async-handler';
import Chapter from '../../models/chapterModel.js';
import Book from '../../models/bookModel.js';

const addNewChapter = asyncHandler(async (req, res) => {
	const { title, image, description, book, paid, price } = req.body;
	const author = req.user._id;

	try {
		const chapter = new Chapter({
			title,
			image,
			description,
			book,
			author,
			paid: paid || false,
			price: price || 0,
			earned: 0,
		});

		const findBook = await Book.findById(book);

		if (findBook) {
			const addChapter = await chapter.save();
			res.status(201).json({ status: 'created', doc: addChapter });
			if (addChapter) {
				findBook.chapters.push(addChapter._id);
				await findBook.save();
			}
		} else {
			res.status(404).json({ status: 'error', message: 'book not found' });
		}
	} catch (e) {
		res.status(500).json({ status: 'error', message: e.message });
	}
});

export default addNewChapter;
