import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export function authfunction(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token)
		return res.status(401).json({ message: 'Access denied. No token present' });

	try {
		const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).json({ message: 'Invalid token.' });
	}
}

export const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
			req.user = decoded;
			//req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			res.status(401).json({ message: 'Not authorized, token failed' });
		}
	}

	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token' });
	}
});

export const admin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next();
	} else {
		res
			.status(401)
			.json({ message: 'You are not authorized to access this information' });
	}
};
