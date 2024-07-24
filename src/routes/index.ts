import { Router } from 'express';
import { homeContorller } from '../controllers/home.controller';
import getBooksDataController from '../controllers/get-books-data.controller';
import borrowBookController from '../controllers/borrow-book.controller';

const router = Router();

router.get('/home', homeContorller);
router.get('/books', getBooksDataController.getAllBooks);
router.get('/books/:bookId', getBooksDataController.getSingleBook);

router.post('/borrow-book', borrowBookController.borrowBook);

export default router;
