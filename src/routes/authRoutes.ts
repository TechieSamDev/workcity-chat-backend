import express from 'express';
import { getSession, login, signup } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/session', getSession);

export default router;
