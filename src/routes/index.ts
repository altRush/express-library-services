import { Router } from 'express';
import { homeContorller } from '../controllers/home-controller';

const router = Router();

router.get('/home', homeContorller);

export default router;
