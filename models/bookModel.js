import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: true,
			trim: true,
			default:
				'https://images.pexels.com/photos/4210782/pexels-photo-4210782.jpeg',
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		chapters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'Chapter',
			},
		],
		likes: {
			type: Number,
			required: true,
			default: 0,
		},
		choice: {
			type: String,
			default: 'none',
		},
		earned: {
			type: Number,
			required: true,
			default: 0,
		},
		views: {
			type: Number,
			required: true,
			default: 0,
		},
		tags: [],
		platform: { type: String, trim: true, lowercase: true },
		genre: { type: String, required: true, trim: true },
		status: { type: String, default: 'unpublished', trim: true },
		language: { type: String, required: true, trim: true },
		type: { type: String, required: true, trim: true, default: 'free' },
		rating: {
			type: String,
			required: true,
			default: 'All',
		},
	},
	{
		timestamps: true,
	}
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
