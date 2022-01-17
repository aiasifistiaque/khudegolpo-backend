import mongoose from 'mongoose';

const unlockSchema = new mongoose.Schema(
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
		chapter: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Chapter',
		},
		price: { type: Number },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Unlock = mongoose.model('Unlock', unlockSchema);

export default Unlock;
