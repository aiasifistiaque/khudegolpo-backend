import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import colors from 'colors';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import authRoute from './routes/authRoute.js';
import bookRoute from './routes/bookRoute.js';
import chapterRoute from './routes/chapterRoute.js';
import followRoute from './routes/followRoute.js';
import libraryRoute from './routes/libraryRoute.js';
import commentsRoute from './routes/commentsRoute.js';
import refillRoute from './routes/refillRoute.js';
import withdrawRoute from './routes/withdrawRoute.js';
import reportRoute from './routes/reportRoute.js';
import uploadRoute from './routes/awsUpload.js';
import unlockRoute from './routes/unlockRoute.js';
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import session from 'express-session';
import facebookRoute from './routes/facebookRoute.js';
import googleRoute from './routes/googleRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import basicRoute from './routes/basicRoute.js';
import infoRoute from './routes/infoRoute.js';

import Strategy from 'passport-google-oauth20';

dotenv.config();

connectDB();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(session({ secret: 'secret' }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use(
	new FacebookStrategy.Strategy(
		{
			clientID: process.env.FB_APP_ID,
			clientSecret: process.env.FB_APP_SECRET,
			callbackURL:
				'https://khudegolpo-backend.herokuapp.com/auth/facebook/callback',
			profileFields: ['emails', 'name', 'displayName', 'photos'],
			enableProof: true,
			state: true,
			session: false,
		},
		function (accessToken, refreshToken, profile, cb) {
			return cb(null, profile);
		}
	)
);

passport.use(
	new Strategy(
		{
			clientID: process.env.GOOGLE_APP_ID,
			clientSecret: process.env.GOOGLE_APP_SECRET,
			callbackURL: `https://khudegolpo-backend.herokuapp.com/auth/google/callback`,
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email',
			],
			state: true,
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'KHUDEGOLPO API',
			version: '0.0.1',
		},
	},
	apis: ['app.js', './routes/*.js', './models/*.js', './swagger/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

//routes
app.use('/api/auth', authRoute);
app.use('/api/books', bookRoute);
app.use('/api/chapters', chapterRoute);
app.use('/api/follow', followRoute);
app.use('/api/library', libraryRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/refill', refillRoute);
app.use('/api/report', reportRoute);
// app.use('/api/search', searchRoute);
app.use('/api/withdraw', withdrawRoute);
app.use('/api/unlock', unlockRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/user', userRoute);
app.use('/api/basic', basicRoute);
app.use('/api/info', infoRoute);
app.use('/api/notifications', notificationRoute);
app.use('/admin-api', adminRoute);
app.use('/auth/facebook', facebookRoute);
app.use('/auth/google', googleRoute);

// app.use('/api/review', reviewRoute);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//app.use('/api/payment', gatewayRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));
