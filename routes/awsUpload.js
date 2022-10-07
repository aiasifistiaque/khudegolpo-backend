//require('dotenv').config()
import fs from 'fs';
import AWS from 'aws-sdk';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';

const router = express.Router();

const uploadFile = multer({ dest: 'from/' });

// uploads a file to s3
router.post('/', uploadFile.single('image'), async (req, res) => {
	//configuring the AWS environment
	AWS.config.update({
		region: process.env.AWS_REGION,
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		signatureVersion: 'v4',
	});

	const s3 = new AWS.S3();
	try {
		let width = 600;
		let height = 600;

		const fileName = `${Date.now()}_${req.file.originalname}`;

		await sharp(req.file.path)
			.webp()
			.toBuffer()
			.then(data => {
				var params = {
					Bucket: process.env.S3_BUCKET_NAME,
					Body: data,
					Key: fileName,
				};
				s3.upload(params, function (err, data) {
					//handle error
					if (err) {
						console.log('there was an error');
						console.log('Error', err);
						return res.status(500).json({ message: 'error' });
					}

					//success
					if (data) {
						console.log(data);
						console.log('Uploaded in:', data.Location);
						return res.status(200).json(data);
					}
				});
			});

		fs.unlinkSync(req.file.path);
		// const fileStream = fs.createReadStream(req.file.path);
		// console.log('file', fileStream);

		// console.log(req.file);
		// const fileStream = fs.createReadStream(req.file.path);
		// var params = {
		// 	Bucket: process.env.S3_BUCKET_NAME,
		// 	Body: fileStream,
		// 	Key: fileName,
		// };
		// s3.upload(params, function (err, data) {
		// 	//handle error
		// 	if (err) {
		// 		console.log('there was an error');
		// 		console.log('Error', err);
		// 		return res.status(500).json({ message: 'error' });
		// 	}

		// 	//success
		// 	if (data) {
		// 		console.log(data);
		// 		console.log('Uploaded in:', data.Location);
		// 		return res.status(200).json(data);
		// 	}
		// });
	} catch (e) {
		console.log(e.message);
		res.status(500).json({ message: 'error' });
	}
});

export default router;
