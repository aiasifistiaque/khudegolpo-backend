import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema(
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
			trim: true,
		},
		book: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Book',
		},
		likes: {
			type: Number,
			required: true,
			default: 0,
		},
		views: {
			type: Number,
			default: 0,
		},
		earned: {
			type: Number,
			required: true,
			default: 0,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		paid: { type: Boolean, required: true, default: false },
		price: { type: Number, required: true, defult: 0 },
		status: { type: String, default: 'unpublished', trim: true },
	},
	{
		timestamps: true,
	}
);

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
