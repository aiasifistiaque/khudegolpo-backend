import express from 'express';
import { protect } from '../middleware/auth.js';
import unlockChapter from '../controllers/unlock/unlockChapter.js';
import myUnlocks from '../controllers/unlock/myUnlocks.js';
import isUnlocked from '../controllers/unlock/isUnlocked.js';
import { sort } from '../middleware/sort.js';

/**Swagger doc
 * completed
 * version 0.1
 * 1/11/21 16:12
 * total routes: 1
 * root: /api/unlock/
 */

const router = express.Router();

router.get('/', protect, sort, myUnlocks);
router.get('/:id', protect, isUnlocked);
router.post('/', protect, unlockChapter);

export default router;

/**
 * Add a refill request
 * @swagger
 * definitions:
 *   unlockRequest:
 *     required:
 *       - chapter
 *     properties:
 *       chapter:
 *         type: string
 *         description: id of the chapter
 *         example: 6144527c8c38d1850e32dd16
 */

/**
 * Route #1
 * @swagger
 * /unlock:
 *   get:
 *     summary: Get all unlocks of user
 *     description: Get all unlocks of user [PROTECT]
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
 * /unlock/:id:
 *   get:
 *     summary: If user purchased the chapter
 *     description: If user purchased the chapter [PROTECT]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: id
 *         description: id of the chapter
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {unlock:0} 0 if not unlocked 1 if yes
 */

/**
 * Route #2
 * @swagger
 * /unlock:
 *   post:
 *     summary: Unlock Chapter
 *     description: Unlock Chapter [PROTECT]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: req body
 *         description: New Chapter Unlock Request
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/unlockRequest"
 *     responses:
 *       404:
 *         description: String - error
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {status:String, doc:Object}
 */
