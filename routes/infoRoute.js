import express from 'express';
import bookInfoController from '../controllers/info/bookInfoController.js';
import chapterInfoController from '../controllers/info/chapterInfoController.js';

/**Swagger doc
 * completed
 * version 0.1
 * 16/09/21 13:29
 * total routes: 0
 * root: /api/books/
 */

const router = express.Router();

router.get('/book/:id', bookInfoController);
router.get('/chapter/:id', chapterInfoController);

export default router;
