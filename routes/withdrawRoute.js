import express from 'express';
import { protect } from '../middleware/auth.js';
import withdrawRequest from '../controllers/usersController/withdrawRequest.js';
import myWithdraws from '../controllers/usersController/myWithdraws.js';
import { sort } from '../middleware/sort.js';

/**Swagger doc
 * completed
 * version 0.1
 * 29/10/21 16:12
 * total routes: 2
 * root: /api/withdraw/
 */

const router = express.Router();

router.get('/', protect, sort, myWithdraws);
router.post('/', protect, withdrawRequest);

export default router;

/**
 * Add a refill request
 * @swagger
 * definitions:
 *   withdrawRequest:
 *     required:
 *       - name
 *       - amount
 *       - account
 *       - bank
 *       - branch
 *     properties:
 *       name:
 *         type: string
 *         description: Name of the account holder
 *         example: Asif Istiaque
 *       amount:
 *         type: number
 *         description: amount to be transferred
 *         example: 2000
 *       account:
 *         type: string
 *         description: account number of user bank or airtime transfer number
 *         example: AC00923128523402394
 *       bank:
 *         type: string
 *         description: Name of the user's phone carrier or user's bank
 *         example: BRAC bank
 *       branch:
 *         type: string
 *         description: Branch of the bank
 *         example: Mohammadpur Branch
 */

/**
 * Route #1
 * @swagger
 * /withdraw:
 *   get:
 *     summary: Get all withdraw requests of the user
 *     description: Get all refills of the user [PROTECT]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         type: String
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {status:String, doc:Array}
 */

/**
 * Route #2
 * @swagger
 * /withdraw:
 *   post:
 *     summary: Creater a new withdraw request
 *     description: Creater a new withdraw request [PROTECT]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: req body
 *         description: New Withdraw request
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/withdrawRequest"
 *     responses:
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {status:String, doc:Object}
 */
