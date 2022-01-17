import express from 'express';
import { protect } from '../middleware/auth.js';
import followUser from '../controllers/usersController/followUser.js';
import getFollowers from '../controllers/usersController/getFollowers.js';
import unfollowUser from '../controllers/usersController/unfollowUser.js';

/**Swagger doc
 * completed
 * version 0.1
 * 19/09/21 16:12
 * total routes: 3
 * root: /api/follow/
 */

const router = express.Router();

router.put('/:id', protect, followUser);
router.get('/', protect, getFollowers);
router.delete('/:id', protect, unfollowUser);

export default router;

/**
 * Route #1
 * @swagger
 * /follow:
 *   get:
 *     description: Get all followers and followings
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: sort
 *         description: sort options newest, oldest
 *         in: req query url params
 *         type: string
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {followers:Array, followings:Array, followingsCount:Number, followersCount:Number}
 */

/**
 * Route #2
 * @swagger
 * /follow/{id}:
 *   put:
 *     description: Follow another user [PROTECT]
 *     parameters:
 *       - name: id
 *         description: id of the user to follow
 *         in: req params
 *         required: true
 *         type: String
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *     responses:
 *       400:
 *         description: returns Object - {status:String, msg:String}
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, doc:object, user:user, follower:follower} details
 */

/**
 * Route #3
 * @swagger
 * /follow/{id}:
 *   delete:
 *     description: Unfollow an user [PROTECT]
 *     parameters:
 *       - name: id
 *         description: id of the user to follow
 *         in: req params
 *         required: true
 *         type: String
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *     responses:
 *       400:
 *         description: returns Object - {status:String, msg:String}
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       200:
 *         description: returns {status:String, deletedEntry:object, user:user, follower:follower} details
 */
