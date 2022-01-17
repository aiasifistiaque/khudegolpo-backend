import express from 'express';
import { protect } from '../middleware/auth.js';
import getAllBooks from '../controllers/booksController/getAllBooks.js';
import addNewBook from '../controllers/booksController/addNewBook.js';
import getBookById from '../controllers/booksController/getBookById.js';
import publishBook from '../controllers/booksController/publishBook.js';
import editBook from '../controllers/booksController/editBook.js';

/**Swagger doc
 * completed
 * version 0.1
 * 16/09/21 13:29
 * total routes: 0
 * root: /api/books/
 */

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', protect, addNewBook);
router.get('/:id', protect, getBookById);
router.put('/publish', protect, publishBook);
router.put('/', protect, editBook);

export default router;

/**
 * Change Publish Status
 * @swagger
 * definitions:
 *   publishStatusChange:
 *     required:
 *       - id
 *       - status
 *     properties:
 *       id:
 *         type: string
 *         description: id of the book
 *         example: 617a8d08f563e91682368649
 *       status:
 *         type: string
 *         description: updated status
 *         example: publish
 */

/**
 * Add a New Book
 * @swagger
 * definitions:
 *   addNewBook:
 *     required:
 *       - title
 *       - image
 *       - description
 *       - genre
 *       - status
 *       - language
 *       - type
 *       - rating
 *     properties:
 *       title:
 *         type: string
 *         description: Title of the book
 *         example: In the Tall Grass
 *       image:
 *         type: string
 *         description: Image of book
 *         example: https://images.pexels.com/photos/4210782/pexels-photo-4210782.jpeg
 *       description:
 *         type: string
 *         description: A Brief description of the book
 *         example: In the Tall Grass is a 2019 Canadian supernatural horror drama film written and directed by Vincenzo Natali
 *       genre:
 *         type: string
 *         description: Genre of the book
 *         example: action
 *       status:
 *         type: string
 *         description: published or not
 *         example: unpublished
 *       language:
 *         type: string
 *         description: Language
 *         example: English
 *       type:
 *         type: string
 *         description: If book is free or paid
 *         example: paid
 *       rating:
 *         type: string
 *         description: Maturity rating
 *         example: adult
 *       tags:
 *         type: string
 *         description: Tags of book
 *         example: [horror, thrill]
 *       platform:
 *         type: string
 *         description: If book is app specific or not
 *         example: app only
 */

/**
 * Edit a book
 * @swagger
 * definitions:
 *   editBook:
 *     required:
 *       - id
 *       - title
 *       - description
 *       - genre
 *       - language
 *       - type
 *       - rating
 *     properties:
 *       id:
 *         type: string
 *         description: Id of the book
 *         example: 618030c7b05608dc41f46eeb
 *       title:
 *         type: string
 *         description: Title of the book
 *         example: In the Tall Grass
 *       description:
 *         type: string
 *         description: A Brief description of the book
 *         example: In the Tall Grass is a 2019 Canadian supernatural horror drama film written and directed by Vincenzo Natali
 *       genre:
 *         type: string
 *         description: Genre of the book
 *         example: action
 *       language:
 *         type: string
 *         description: Language
 *         example: English
 *       type:
 *         type: string
 *         description: If book is free or paid
 *         example: paid
 *       rating:
 *         type: string
 *         description: Maturity rating
 *         example: adult
 *       tags:
 *         type: string
 *         description: Tags of book
 *         example: [horror, thrill]
 *       platform:
 *         type: string
 *         description: If book is app specific or not
 *         example: app only
 */

/**
 * Route #1
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     parameters:
 *       - name: genre
 *         description: get books from a specific genre
 *         in: req query url params
 *         type: String
 *       - name: search
 *         description: search for books
 *         in: req query url params
 *         type: String
 *       - name: page
 *         description: page number default 0
 *         in: req query url params
 *         type: Number
 *       - name: type
 *         description: if type is home then data is smaller
 *         in: req query url params
 *         type: String
 *       - name: paid
 *         description: book is paid or not paid=1
 *         in: req query url params
 *         type: String
 *       - name: perpage
 *         description: Number of products per page default 10
 *         in: req query url params
 *         type: Number
 *       - name: sort
 *         description: sort options newest, oldest, nameAsc, nameDsc, popular
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
 * /books:
 *   post:
 *     summary: Crete a new book [PROTECT]
 *     description: Crete a new book [PROTECT]
 *     parameters:
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *       - name: req body
 *         description: request body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/addNewBook"
 *     responses:
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, book:object} book that has been created
 */

/**
 * Route #3
 * @swagger
 * /books/{id}:
 *   get:
 *     description: Get a book by id
 *     parameters:
 *       - name: id
 *         description: id of the book
 *         in: req params
 *         required: true
 *         type: String
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *     responses:
 *       404:
 *         description: String - error
 *       200:
 *         description: returns book:Object
 */

/**
 * Route #2
 * @swagger
 * /books/publish:
 *   post:
 *     summary: Change publish status
 *     description: Change publish status [PROTECT]
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
 *           $ref: "#/definitions/publishStatusChange"
 *     responses:
 *       500:
 *         description: returns Object {status:String, message:error}
 *       200:
 *         description: returns Object {status:String, doc:Object}
 */

/**
 * Route #2
 * @swagger
 * /books:
 *   put:
 *     summary: Edit a book [PROTECT]
 *     description: Edit a book [PROTECT]
 *     parameters:
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *       - name: req body
 *         description: request body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/editBook"
 *     responses:
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, book:object} book that has been edited
 */
