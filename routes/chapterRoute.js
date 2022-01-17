import express from 'express';
import { protect } from '../middleware/auth.js';
import addNewChapter from '../controllers/chaptersController/addNewChapter.js';
import getChapterById from '../controllers/chaptersController/getChapterById.js';
import publishChapter from '../controllers/chaptersController/publishChapter.js';
import editChapter from '../controllers/chaptersController/editChapter.js';

/**Swagger doc
 * completed
 * version 0.1
 * 17/09/21 13:06
 * total routes: 0
 * root: /api/chapters/
 */

const router = express.Router();

router.post('/', protect, addNewChapter);
router.get('/:id', protect, getChapterById);
router.put('/publish', protect, publishChapter);
router.put('/', protect, editChapter);

export default router;

/**
 * Add a new chapter
 * @swagger
 * definitions:
 *   addNewChapter:
 *     required:
 *       - title
 *       - image
 *       - description
 *       - book
 *       - paid
 *       - price
 *     properties:
 *       title:
 *         type: string
 *         description: Title of the chapter
 *         example: In the Tall Grass
 *       image:
 *         type: string
 *         description: Cover image of chapter
 *         example: https://images.pexels.com/photos/4210782/pexels-photo-4210782.jpeg
 *       description:
 *         type: string
 *         description: A Brief description of the book
 *         example: In the Tall Grass is a 2019 Canadian supernatural horror drama film written and directed by Vincenzo Natali
 *       book:
 *         type: string
 *         description: Id of the book
 *         example: 6180fb2a85f761e5167328f0
 *       status:
 *         type: string
 *         description: published or not
 *         example: unpublished
 *       paid:
 *         type: boolean
 *         description: Language
 *         example: true
 *       price:
 *         type: number
 *         description: price of chapter
 *         example: 200
 */

/**
 * Edit a chapter
 * @swagger
 * definitions:
 *   editChapter:
 *     required:
 *       - id
 *       - title
 *       - description
 *       - paid
 *       - price
 *     properties:
 *       id:
 *         type: string
 *         description: Id of the chapter
 *         example: 618030c7b05608dc41f46eeb
 *       title:
 *         type: string
 *         description: Title of the chapter
 *         example: In the Tall Grass
 *       description:
 *         type: string
 *         description: A Brief description of the book
 *         example: In the Tall Grass is a 2019 Canadian supernatural horror drama film written and directed by Vincenzo Natali
 *       paid:
 *         type: boolean
 *         description: Language
 *         example: true
 *       price:
 *         type: number
 *         description: price of chapter
 *         example: 200
 */

/**
 * Change Publish Status
 * @swagger
 * definitions:
 *   publishStatusChangeChapter:
 *     required:
 *       - id
 *       - status
 *     properties:
 *       id:
 *         type: string
 *         description: id of the chapter
 *         example: 617a8d08f563e91682368649
 *       status:
 *         type: string
 *         description: updated status
 *         example: publish
 */

/**
 * Route #1
 * @swagger
 * /chapters:
 *   post:
 *     description: Crete a new chapter [PROTECT]
 *     parameters:
 *       - name: req body
 *         description: request body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/addNewChapter"
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *     responses:
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, chapter:object} chapter that has been created
 */

/**
 * Route #1
 * @swagger
 * /chapters:
 *   put:
 *     description: Edit a chapter [PROTECT]
 *     parameters:
 *       - name: req body
 *         description: request body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/editChapter"
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *     responses:
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, chapter:object} chapter that has been editer
 */

/**
 * Route #3
 * @swagger
 * /chapters/{id}:
 *   get:
 *     description: Get a chapter by id
 *     parameters:
 *       - name: id
 *         description: id of the chapter
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       404:
 *         description: String - error
 *       200:
 *         description: returns chapter:Object
 */

/**
 * Route #2
 * @swagger
 * /chapters/publish:
 *   post:
 *     summary: Change publish status of chapter
 *     description: Change publish status of chapter [PROTECT]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: req body
 *         description: Change publish status
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/publishStatusChangeChapter"
 *     responses:
 *       500:
 *         description: returns Object {status:String, message:error}
 *       200:
 *         description: returns Object {status:String, doc:Object}
 */
