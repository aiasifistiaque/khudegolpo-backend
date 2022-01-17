import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		category: String,
		details: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			trim: true,
			lowercase: true,
		},
		target: {
			type: String,
			required: true,
		},
		seen: { type: Boolean, required: true, default: false },
		status: { type: String, default: 'unresolved' },
	},
	{
		timestamps: true,
	}
);

const Report = mongoose.model('Report', reportSchema);

export default Report;
