import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
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
		image: { type: String, default: '/icon.png' },
		target: {
			type: String,
			required: true,
			trim: true,
		},
		from: { type: String },
		seen: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
	}
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
