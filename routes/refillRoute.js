import express from 'express';
import { protect } from '../middleware/auth.js';
import refillRequest from '../controllers/usersController/refillRequest.js';
import myRefills from '../controllers/usersController/myRefills.js';
import { sort } from '../middleware/sort.js';

/**Swagger doc
 * completed
 * version 0.1
 * 19/09/21 16:12
 * total routes: 3
 * root: /api/follow/
 */

const router = express.Router();

router.post('/', protect, refillRequest);
router.get('/', protect, sort, myRefills);

export default router;

/**
 * Add a refill request
 * @swagger
 * definitions:
 *   refillRequest:
 *     required:
 *       - amount
 *       - type
 *       - target
 *       - from
 *     properties:
 *       amount:
 *         type: number
 *         description: amount to be transferred
 *         example: 50
 *       type:
 *         type: string
 *         description: options - bank/airtrime
 *         example: bank
 *       target:
 *         type: string
 *         description: Name of the user's phone carrier or user's bank
 *         example: BRAC bank
 *       from:
 *         type: string
 *         description: account number of user bank or airtime transfer number
 *         example: AC00923128523402394
 *       name:
 *         type: string
 *         description: Name of the account holder in case of bank transfer
 *         example: Asif Istiaque
 *       date:
 *         type: string
 *         description: Date when bank transfer was mane in case of bank transfer
 *         example: Dec 22,2021
 */

/**
 * Get My Refills
 * @swagger
 * definitions:
 *   myRefills:
 *         example: {
 *                  "status": "success",
 *                  "doc": [
 *                           {
 *                              "_id": "614aeeb99c6871649d9c5df5",
 *                               "amount": 50,
 *                               "type": "airtime",
 *                               "status": "requested",
 *                               "createdAt": "2021-09-22T08:52:09.481Z"
 *                           }
 *                          ],
 *                  "count": 4,
 *                  "pages": 4,
 *                  "page": 1,
 *                  "perpage": 1
 *                  }
 */

/**
 * Route #1
 * @swagger
 * /refill:
 *   get:
 *     summary: Get all refill requests of the user
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
 *         description: Returns all refills
 *         schema:
 *           $ref: "#/definitions/myRefills"
 */

/**
 * Route #2
 * @swagger
 * /refill:
 *   post:
 *     summary: Creater a new refill request
 *     description: Creater a new refill request [PROTECT]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: req body
 *         description: New Refill requesr
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/refillRequest"
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {status:String, doc:Object}
 */
