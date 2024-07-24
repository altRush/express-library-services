import { Router } from 'express';
import { homeContorller } from '../controllers/home.controller';
import getBooksDataController from '../controllers/get-books-data.controller';

const router = Router();

router.get('/home', homeContorller);
router.get('/books', getBooksDataController.getAllBooks);
router.get('/books/:bookId', getBooksDataController.getSingleBook);

export default router;
