import express from 'express';
import { compileCode } from '../controllers/compileController.js';

const router = express.Router();

// POST /api/compile
router.post('/compile', compileCode);

export default router;
