import { Router } from 'express';
import * as auth from '../controllers/authController.js';
import { requireJwt } from '../middleware/requireJwt.js';

export const router = Router();

router.post('/login', auth.login);
router.get('/me', requireJwt, auth.me);
