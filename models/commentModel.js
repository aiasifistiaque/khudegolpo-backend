import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		comment: {
			type: String,
			required: true,
		},
		book: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Book',
		},
		chapter: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chapter',
		},
		likes: {
			type: Number,
			required: true,
			default: 0,
		},
		status: {
			type: String,
			default: 'posted',
		},
		dislikes: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
