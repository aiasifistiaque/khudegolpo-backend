import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';

const sendOtp = asyncHandler(async (req, res) => {
	try {
		const foundUser = await User.findOne({ email: req.body.email }).select([
			'-password',
		]);

		if (!foundUser) return res.status(400).json({ message: 'User not found' });

		const otp = otpGenerator.generate(6, {
			upperCase: false,
			specialChars: false,
			alphabets: false,
		});

		foundUser.resetCode = otp;

		const saveUser = await foundUser.save();

		if (saveUser) {
			sendOtpToMail(saveUser, otp);
			res.status(200).json({ status: 'sent', email: saveUser.email });
		} else {
			res.status(500).json({ message: 'there was an error' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});

const sendOtpToMail = (user, otp) => {
	const from = `Arewa Books <${process.env.MAIL_ADDRESS}>`;

	try {
		var transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: false,
			auth: {
				user: process.env.MAIL_ADDRESS,
				pass: process.env.MAIL_PASSWORD,
			},
		});

		var mailOptions = {
			from: from,
			to: user.email,
			subject: `Password Reset Request Code ${otp}`,
			text: 'Password Reset Request',
			html: `<div>
					<h4 style="margin:0px;font-weight:400;">Hi, ${user.username}</h4>
                    <h5 style="margin-bottom:1px">We received a request to reset your Arewa Books account password.</h5>
                    <h5 style="margin-bottom:5px">Enter the following password reset code:</h5>
                    <h2>${otp}</h2>
                    <hr/>
                    <p>This message was sent to ${user.email} at your request.</p>
                    <p style="margin:0px;">If you did not request a password reset, let us know:</p>
                    <br/>
                    <p style="margin:0px;">Phone: </p>
                    <p style="margin:0px;">Email: </p>
                    </div>`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	} catch (e) {
		console.log(e);
	}
};

export default sendOtp;
