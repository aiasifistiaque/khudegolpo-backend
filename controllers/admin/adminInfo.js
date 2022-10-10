import asyncHandler from 'express-async-handler';
import Book from '../../models/bookModel.js';
import Chapter from '../../models/chapterModel.js';
import { User } from '../../models/userModel.js';
import Admin from '../../models/adminModel.js';

const adminInfo = asyncHandler(async (req, res) => {
	try {
		const data = await Admin.findOne().populate(
			'bookOne bookTwo bookThree bookFour bookFive bookSix'
		);
		const books = await Book.countDocuments();
		const users = await User.countDocuments();
		const chapters = await Chapter.countDocuments();
		const authors = await Book.find().distinct('author');

		if (data) {
			data.books = books;
			data.users = users;
			data.chapters = chapters;
			data.authors = authors.length || 1;
			const doc = await data.save();
			res.status(200).json({ doc: data, status: 'updated' });
		} else {
			const admin = new Admin({
				books,
				chapters,
				users,
				commission: 25,
				authors: authors.length || 1,
			});
			const doc = await admin.save();
			res.status(201).json({ doc, status: 'created' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminInfo;
