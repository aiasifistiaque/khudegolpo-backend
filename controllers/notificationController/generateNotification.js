import Notification from '../../models/notificationModel.js';
import { User } from '../../models/userModel.js';
import { Expo } from 'expo-server-sdk';
import textShorten from '../../util/textShorten.js';

let expo = new Expo();

const generateNotification = async ({ user, details, image, type, target }) => {
	try {
		const notification = new Notification({
			user: user,
			details: details,
			image: image ? image : '/icon.png',
			type: type,
			target: target,
			seen: false,
		});
		const created = await notification.save();

		console.log('New Notification generated', created);
		const foundUser = await User.findById(user).select('expoToken');
		const pushToken = foundUser.expoToken;

		if (!pushToken) return;

		if (!Expo.isExpoPushToken(pushToken)) {
			console.error(`Push token ${pushToken} is not a valid Expo push token`);
			return;
		}

		let messages = [];

		messages.push({
			to: pushToken,
			sound: 'default',
			title:
				type == 'bookComment' || type == 'chapterComment'
					? 'New Comment'
					: type == 'follow'
					? 'New Follower'
					: type,
			body: details,
			data: {
				user: user,
				details: details,
				image: image ? image : '/icon.png',
				type: type,
				target: target,
				seen: false,
			},
		});

		let chunks = expo.chunkPushNotifications(messages);
		let tickets = [];
		(async () => {
			for (let chunk of chunks) {
				try {
					let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
					console.log(ticketChunk);
					tickets.push(...ticketChunk);
				} catch (error) {
					console.error(error);
				}
			}
		})();
	} catch (e) {
		console.log(e.message);
	}
};

export default generateNotification;
