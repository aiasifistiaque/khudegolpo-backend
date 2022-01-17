import express from 'express';
import { protect } from '../middleware/auth.js';
import getOtherUser from '../controllers/usersController/getOtherUser.js';

/**Swagger doc
 * completed
 * version 0.1
 * 16/09/21 13:29
 * total routes: 0
 * root: /api/books/
 */

const router = express.Router();

router.get('/:id', protect, getOtherUser);
// router.post('/', protect, addNewBook);
// router.get('/:id', protect, getBookById);
// router.put('/publish', protect, publishBook);
// router.put('/', protect, editBook);

export default router;

/**
 * Find Other User
 * @swagger
 * definitions:
 *   otherUser:
 *     properties:
 *       status:
 *         type: string
 *         description: Status
 *         example: success
 *       doc:
 *         type: Object
 *         description: User Object
 *         example: { "_id": "6142eabd725a0f7de27c5cbd","name": "Asif Istiaque",
 *                      "username": "asifistiaque",
 *                      "followers": 2,
 *                      "followings": 3}
 *       books:
 *         type: Array
 *         description: Array of Books
 *         example: [{ "_id": "617a8d08f563e91682368649",
 *                      "title": "The Babysitter",
 *                      "image": "https://arewabooks.s3.us-east-2.amazonaws.com/1635421432278_The_Babysitter_%282017_film%29.png",
 *                      "chapters": [
 *                          "61815f9bfce3cef31ab8609b",
 *                          "61815fddfce3cef31ab860c8"
 *                      ],
 *                      "genre": "horror"}]
 *       follow:
 *         type: Boolean
 *         description: Is this account followed by user 0 if false 1 if true
 *         example: 0
 */

/**
 * Route #1
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get Details about a specific user
 *     description: Get Details about a specific user [PROTECT]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         type: String
 *       - name: req params
 *         description: id of the target user
 *         in: req params
 *         type: String
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: Returns data
 *         schema:
 *           $ref: "#/definitions/otherUser"
 */
