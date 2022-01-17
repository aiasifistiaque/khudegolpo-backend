import asyncHandler from 'express-async-handler';
import axios from 'axios';
import { User } from '../../models/userModel.js';

const facebookAppAuth = asyncHandler(async (req, res) => {
	try {
		const fbRoute = `https://graph.facebook.com/me?access_token=${req.body.token}&fields=id,name,email,picture.height(500)`;

		const { data } = await axios.get(`${fbRoute}`);

		//if (!data) return res.status(500).json({ message: 'there was an error' });

		const user = await User.findOne({
			$or: [{ email: `${data.id}@facebook.com` }],
		});

		if (user) {
			const token = user.generateAuthToken();
			return res.status(200).send(`Bearer ${token}`);
		} else {
			const newUser = new User({
				name: data.name,
				image: data.picture.data.url,
				username: `fb_${data.id}`,
				provider: 'facebook',
				providerId: `fb${data.id}`,
				//password: accessToken,
				email: `${data.id}@facebook.com`,
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

export default facebookAppAuth;
