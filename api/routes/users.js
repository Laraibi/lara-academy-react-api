import { Router } from 'express';
import * as users from '../controllers/userController.js';

export const router = Router();

router.get('/', users.index);
router.post('/', users.store);
router.put('/:id', users.update);
router.delete('/:id', users.destroy);
