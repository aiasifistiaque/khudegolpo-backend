import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 50,
			trim: true,
		},
		image: {
			type: String,
			default: '/book/pp.png',
		},
		username: {
			type: String,
			required: true,
			minlength: 4,
			unique: true,
			trim: true,
			lowercase: true,
		},
		description: {
			type: String,
			trim: true,
		},
		walletBalance: {
			type: Number,
			required: true,
			default: 0,
		},
		earning: {
			type: Number,
			required: true,
			default: 0,
		},
		email: {
			type: String,
			maxlength: 255,
			unique: true,
			trim: true,
		},
		provider: { type: String },
		providerId: { type: String },
		providerToken: { type: String },
		expoToken: { type: String },

		followers: {
			type: Number,
			default: 0,
		},
		followings: {
			type: Number,
			default: 0,
		},

		resetCode: {
			type: String,
		},

		role: { type: String, default: 'user' },
		password: { type: String, minlength: 5, maxlength: 1024 },
	},
	{
		timestamps: true,
	}
);

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			username: this.username,
			role: this.role,
		},
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

export const User = mongoose.model('User', userSchema);

export function validate(user) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		username: Joi.string().alphanum().min(4).max(255).required(),
		password: Joi.string().min(5).max(255).required(),
		role: Joi.string(),
	});
	return schema.validate(user);
}
