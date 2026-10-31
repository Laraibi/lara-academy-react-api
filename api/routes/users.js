import { Router } from 'express';
import * as users from '../controllers/userController.js';

export const router = Router();

router.get('/', users.index);
