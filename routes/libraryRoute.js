import express from 'express';
import { protect } from '../middleware/auth.js';
import addToLibrary from '../controllers/libraryController.js/addToLibrary.js';
import getLibrary from '../controllers/libraryController.js/getLibrary.js';
import changeChapter from '../controllers/libraryController.js/changeChapter.js';
import myBooks from '../controllers/usersController/myBooks.js';
import isAdded from '../controllers/libraryController.js/isAdded.js';

/**Swagger doc
 * completed
 * version 0.1
 * 20/09/21 03:40
 * total routes: 2
 * root: /api/library/
 */

const router = express.Router();

router.post('/', protect, addToLibrary);
router.get('/', protect, getLibrary);
router.put('/chapter', protect, changeChapter);
router.get('/writings', protect, myBooks);
router.get('/book/:book', protect, isAdded);

export default router;

/**
 * Add Book to library
 * @swagger
 * definitions:
 *   addToLibrary:
 *     required:
 *       - book
 *     properties:
 *       book:
 *         type: string
 *         description: id of the book
 *         example: 617ac20bc16369acb9b827fa
 *       status:
 *         type: string
 *         description: Status of the book in library default Added
 *         example: Added
 */

/**
 * Route #1
 * @swagger
 * /library:
 *   get:
 *     description: Get library of current user
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
 *         description: returns Object {books:Array, count:Number}
 */

/**
 * Route #2
 * @swagger
 * /library:
 *   post:
 *     description: Add a book to the library [PROTECT]
 *     parameters:
 *       - name: req body
 *         description: Add To Library
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/addToLibrary"
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
 *         description: returns {status:String, book:object} details
 */

/**
 * Route #2
 * @swagger
 * /library/chapter:
 *   put:
 *     description: Change current chapter of a book [PROTECT]
 *     parameters:
 *       - name: book
 *         description: id of the book
 *         in: req body
 *         required: true
 *         type: String
 *       - name: chapter
 *         description: id of the chapter
 *         in: req body
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
 *         description: returns {status:String, book:object} details
 */

/**
 * Route #1
 * @swagger
 * /library/writings:
 *   get:
 *     description: Get books written by current user
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: status
 *         description: published unpublished or all
 *         in: req query url params
 *         type: string
 *       - name: sort
 *         description: sort options newest, oldest
 *         in: req query url params
 *         type: string
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {doc:Array, status:String}
 */

/**
 * Route #1
 * @swagger
 * /library/book/:book:
 *   get:
 *     description: Is book in user library
 *     summary: Is book added in user library
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: book
 *         description: id of the book
 *         in: req params
 *         type: string
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {found:number, doc:doc}
 */
