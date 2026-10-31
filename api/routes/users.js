import { Router } from 'express';
import * as users from '../controllers/userController.js';
import { requireJwt } from '../middleware/requireJwt.js';

export const router = Router();

router.use(requireJwt);

router.get('/', users.index);
router.post('/', users.store);
router.put('/:id', users.update);
router.delete('/:id', users.destroy);
