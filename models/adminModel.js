import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
	{
		books: {
			type: Number,
			required: true,
			dafault: 0,
		},
		chapters: {
			type: Number,
			required: true,
			dafault: 0,
		},
		users: {
			type: Number,
			required: true,
			dafault: 0,
		},
		paidBooks: {
			type: Number,
			dafault: 0,
		},
		authors: {
			type: Number,
			dafault: 0,
		},

		commission: {
			type: Number,
			required: true,
			dafault: 25,
		},
		coverOne: {
			type: String,
			default: 'slider1.jpg',
		},
		coverOneRedirect: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '619380b890bd280f8fd4cd29',
		},
		coverTwo: {
			type: String,
			default: 'slider1.jpg',
		},
		coverTwoRedirect: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '619380b890bd280f8fd4cd29',
		},
		coverThree: {
			type: String,
			default: 'slider1.jpg',
		},
		coverThreeRedirect: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '619380b890bd280f8fd4cd29',
		},
		bookOne: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '61e5155fd366e8fd59f9b8ec',
		},
		bookTwo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '61e5155fd366e8fd59f9b8ec',
		},
		bookThree: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '61e5155fd366e8fd59f9b8ec',
		},
		bookFour: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '61e5155fd366e8fd59f9b8ec',
		},
		bookFive: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '61e5155fd366e8fd59f9b8ec',
		},
		bookSix: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			default: '61e5155fd366e8fd59f9b8ec',
		},
	},
	{
		timestamps: true,
	}
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
