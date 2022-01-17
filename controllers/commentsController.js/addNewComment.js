import asyncHandler from 'express-async-handler';
import Comment from '../../models/commentModel.js';
import { User } from '../../models/userModel.js';
import generateNotification from '../notificationController/generateNotification.js';
import Book from '../../models/bookModel.js';
import textShorten from '../../util/textShorten.js';

const addNewComment = asyncHandler(async (req, res) => {
	const { comment, book, chapter } = req.body;
	const user = req.user._id;

	const findUser = await User.findById(user).select('username image');
	const findBook = await Book.findById(book).select('title author');

	try {
		const newComment = new Comment({
			user,
			comment,
			book,
			chapter,
		});

		const addComment = await newComment.save();

		user != findBook.author &&
			(await generateNotification({
				user: findBook.author,
				details: `${findUser.username} commented on your post "${textShorten(
					comment,
					20
				)}"`,
				type: chapter ? 'chapterComment' : 'bookComment',
				target: chapter ? chapter : book,
				image: findUser.image || '/icon.png',
			}));

		res.status(201).json({ status: 'created', doc: addComment });
	} catch (e) {
		res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default addNewComment;
