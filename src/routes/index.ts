import { Router } from 'express';
import { homeContorller } from '../controllers/home.controller';
import getBooksDataController from '../controllers/get-books-data.controller';

const router = Router();

router.get('/home', homeContorller);
router.get('/get-all-books', getBooksDataController.getAllBooks);
router.get(
	'/get-single-book-by-id/:bookId',
	getBooksDataController.getSingleBook
);

export default router;
