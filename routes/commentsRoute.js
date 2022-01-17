import express from 'express';
import { protect } from '../middleware/auth.js';
import addNewComment from '../controllers/commentsController.js/addNewComment.js';
import getComments from '../controllers/commentsController.js/getComments.js';
import getCommentById from '../controllers/commentsController.js/getCommentById.js';

/**Swagger doc
 * completed
 * version 0.1
 * 16/09/21 13:29
 * total routes: 2
 * root: /api/books/
 */

const router = express.Router();

router.get('/', getComments);
router.post('/', protect, addNewComment);
router.get('/:id', getCommentById);

// router.get('/:id', getBookById);

export default router;

/**
 * add a comment
 * @swagger
 * definitions:
 *   comments:
 *     required:
 *       - user
 *       - book
 *       - comment
 *     properties:
 *       comment:
 *         type: string
 *       book:
 *         type: string
 *       chapter:
 *         type: string
 */

/**
 * Route #1
 * @swagger
 * /comments:
 *   get:
 *     description: Get all comments from a book or chapter
 *     parameters:
 *       - name: type
 *         description: values - chapter or book, default book
 *         in: req query url params
 *         type: String
 *       - name: id
 *         description: id of the chapter or book
 *         required: true
 *         in: req query url params
 *         type: String
 *       - name: page
 *         description: page number default 0
 *         in: req query url params
 *         type: Number
 *       - name: perpage
 *         description: Number of products per page default 10
 *         in: req query url params
 *         type: Number
 *       - name: sort
 *         description: sort options newest, oldest
 *         in: req query url params
 *         type: string
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {books:Array, total:total Results, perPage:Results per page, page:Current Page, totalPages:Total Number of pages}
 */

/**
 * Route #2
 * @swagger
 * /comments:
 *   post:
 *     summary: Crete a new comment on book or chapter
 *     description: Crete a new comment on book or chapter [PROTECT]
 *     parameters:
 *       - name: req body
 *         description: Comment that is to be posted
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/comments"
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *     responses:
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, doc:object} comment that has been created
 */
