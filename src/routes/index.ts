import { Router } from 'express';
import { homeContorller } from '../controllers/home.controller';
import {
	getAllBooksController,
	getSingleBookController
} from '../controllers/get-books-data.controller';

const router = Router();

router.get('/home', homeContorller);
router.get('/get-all-books', getAllBooksController);
router.get('/get-single-book/:bookId', getSingleBookController);

export default router;
