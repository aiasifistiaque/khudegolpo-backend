import mongoose from 'mongoose';

const refillSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		amount: {
			type: Number,
			required: true,
		},
		name: { type: String, trim: true },
		type: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		target: {
			type: String,
			required: true,
			trim: true,
		},
		from: { type: String, required: true },
		status: {
			type: String,
			required: true,
			default: 'requested',
			lowercase: true,
			trim: true,
		},
		date: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Refill = mongoose.model('Refill', refillSchema);

export default Refill;
