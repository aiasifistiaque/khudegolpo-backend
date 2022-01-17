import asyncHandler from 'express-async-handler';
import axios from 'axios';
import { User } from '../../models/userModel.js';

const googleAppAuth = asyncHandler(async (req, res) => {
	try {
		const googleRoute = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${req.body.token}`;

		console.log(req.body);
		const { data } = await axios.get(`${googleRoute}`);

		//if (!data) return res.status(500).json({ message: 'there was an error' });

		const user = await User.findOne({
			$or: [{ email: data.email }, { username: data.sub }],
		});

		if (user) {
			const token = user.generateAuthToken();
			return res.status(200).send(`Bearer ${token}`);
		} else {
			const newUser = new User({
				name: data.name,
				image: data.picture,
				username: data.sub,
				provider: 'google',
				providerId: `google_${data.sub}`,
				//password: accessToken,
				email: data.email,
				providerToken: req.body.token,
			});
			const saveUser = await newUser.save();
			const regToken = saveUser.generateAuthToken();

			return res.status(200).send(`Bearer ${regToken}`);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default googleAppAuth;
