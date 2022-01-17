import mongoose from 'mongoose';

const withdrawSchema = new mongoose.Schema(
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
		account: {
			type: String,
			required: true,
			trim: true,
		},
		bank: { type: String, required: true, trim: true },
		branch: { type: String, trim: true },

		status: {
			type: String,
			required: true,
			default: 'requested',
			lowercase: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

export default Withdraw;
