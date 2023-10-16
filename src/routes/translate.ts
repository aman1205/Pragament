import express from 'express';
import translateController from '../controllers/translateController';

const router = express.Router();

router.get('/translate', translateController.translate);

export default router;
