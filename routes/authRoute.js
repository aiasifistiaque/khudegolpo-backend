import { User, validate } from '../models/userModel.js';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { protect } from '../middleware/auth.js';
import getSelf from '../controllers/usersController/getUser.js';
import updateUser from '../controllers/usersController/updateUser.js';
import sendOtp from '../controllers/auth/sendOtp.js';
import resetPassword from '../controllers/auth/resetPassword.js';
import changePassword from '../controllers/auth/changePassword.js';
import googleAppAuth from '../controllers/auth/googleAppAuth.js';
import facebookAppAuth from '../controllers/auth/facebookAppAuth.js';

const router = express.Router();

//const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.get('/', protect, getSelf);
router.put('/update', protect, updateUser);
router.post('/sendotp', sendOtp);
router.post('/resetpassword', resetPassword);
router.post('/changepassword', protect, changePassword);
router.post('/googleappauth', googleAppAuth);
router.post('/facebookappauth', facebookAppAuth);

router.post('/login', async (req, res) => {
	const { error } = loginValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('email id does not exist');

	if (user.role == 'banned') return res.status(400).send('banned user');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) res.status(400).send('wrong password');

	try {
		const token = user.generateAuthToken();
		res.status(200).send(`Bearer ${token}`);
	} catch {
		e => console.log(e);
	}
});

router.post('/register', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('user already registered..');

	let usernameExists = await User.findOne({ email: req.body.username });
	if (usernameExists) return res.status(400).send('username already in use..');

	user = new User(
		_.pick(req.body, ['name', 'email', 'username', 'password', 'role'])
	);
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	try {
		await user.save();

		const token = user.generateAuthToken();
		res
			.status(200)
			.header('x-auth-token', token)
			.send(_.pick(user, ['_id', 'name', 'email', 'role']));
	} catch (e) {
		res.status(500).send(e);
	}
});

function loginValidate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

export default router;

/**
 * Login definition
 * @swagger
 * definitions:
 *   login:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         description: email of the user
 *         example: asifistiaque.ai@gmail.com
 *       password:
 *         type: string
 *         description: password of the user
 *         example: 01828398225
 */

/**
 * Register definition
 * @swagger
 * definitions:
 *   register:
 *     required:
 *       - name
 *       - email
 *       - username
 *       - password
 *     properties:
 *       name:
 *         type: string
 *         description: Full Name of the user
 *         example: Asif Istiaque
 *       email:
 *         type: string
 *         description: Email of the user
 *         example: asifistiaque.ai@gmail.com
 *       username:
 *         type: string
 *         description: username of the user
 *         example: asifistiaque
 *       password:
 *         type: string
 *         description: Password of the user
 *         example: 01828398225
 */

/**
 * @swagger
 * /auth:
 *   get:
 *     description: Self Details Route
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: req heaedr
 *         required: true
 *     responses:
 *       200:
 *         description: doc - Object.doc
 *       500:
 *         description: String - error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: User login route
 *     tags: [Auth]
 *     parameters:
 *       - name: req body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/login"
 *     responses:
 *       200:
 *         description: String - token
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Sign up/Register a new user
 *     tags: [Auth]
 *     parameters:
 *       - name: req body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/register"
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {user} and token in header
 */
