import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import reportIssue from '../controllers/usersController/reportIssue.js';
import getIssueReports from '../controllers/admin/report/getIssueReports.js';
import resolveIssue from '../controllers/admin/report/resolveIssue.js';
import getSingleReport from '../controllers/admin/report/getSingleReport.js';

/**Swagger doc
 * completed
 * version 0.1
 * 22/09/21 22:42
 * total routes:
 * root: /api/report/
 */

const router = express.Router();

router.post('/', protect, reportIssue);
router.get('/', protect, admin, getIssueReports);
router.put('/:id', protect, admin, resolveIssue);
router.get('/:id', protect, admin, getSingleReport);

export default router;

/**
 * Issue Report definition
 * @swagger
 * definitions:
 *   createReport:
 *     required:
 *       - details
 *       - type
 *       - target
 *     properties:
 *       details:
 *         type: string
 *         description: Detail description of the issue to be reported
 *         example: This chapter contains offensive contents
 *       type:
 *         type: string
 *         description: type of issue to be reported
 *         example: chapter
 *       target:
 *         type: string
 *         description: id of the book or chapter that is to be reported
 *         example: 6144471a5c1de30b6bda7c26
 *       category:
 *         type: string
 *         description: type or category of the issue
 *         example: offensive
 */

/**
 * Route #1
 * @swagger
 * /report:
 *   post:
 *     summary: Report an Issue
 *     description: Creater a issue report by the user [PROTECT]
 *     tags: [User,default]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: req body
 *         description: Req body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/createReport"
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {status:String, doc:Object}
 */

/**
 * Route #2
 * @swagger
 * /report:
 *   get:
 *     summary: Get all the issues that were reported
 *     description: Creater a issue report by the user [ADMIN]
 *     tags: [Admin]
 *     parameters:
 *       - name: token
 *         description: token of the admin
 *         in: req header
 *         required: true
 *         type: String
 *       - name: sort
 *         description: sort results by resolved/unresolved
 *         in: req url params
 *         required: false
 *         type: String
 *       - name: perpage
 *         description: results per page default 25
 *         in: req url params
 *         type: number
 *       - name: page
 *         description: page of result
 *         in: req url params
 *         type: number
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {doc:Array, total:total Results, perPage:Results per page, page:Current Page, totalPages:Total Number of pages}
 */

/**
 * Route #3
 * @swagger
 * /report/{id}:
 *   put:
 *     summary: Update resolve status
 *     description: Update resolve status [ADMIN]
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         description: id of the report
 *         in: req params
 *         required: true
 *         type: String
 *       - name: token
 *         description: token of the admin
 *         in: req header
 *         required: true
 *         type: String
 *       - name: status
 *         description: update status
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {doc:object}
 */

/**
 * Route #3
 * @swagger
 * /report/{id}:
 *   get:
 *     summary: Get Single Report
 *     description: Update resolve status [ADMIN]
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         description: id of the report
 *         in: req params
 *         required: true
 *         type: String
 *       - name: token
 *         description: token of the admin
 *         in: req header
 *         required: true
 *         type: String
 *     responses:
 *       404:
 *         description: String - error
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {doc:object}
 */
