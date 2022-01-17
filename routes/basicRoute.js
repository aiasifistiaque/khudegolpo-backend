import express from 'express';
import coverInfo from '../controllers/admin/coverInfo.js';

const router = express.Router();

router.get('/cover', coverInfo);

export default router;
