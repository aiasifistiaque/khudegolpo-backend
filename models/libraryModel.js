import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		book: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Book',
		},
		status: {
			type: String,
			default: 'Added',
		},
		currentChapter: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chapter',
		},
	},
	{
		timestamps: true,
	}
);

const Library = mongoose.model('Library', librarySchema);

export default Library;
