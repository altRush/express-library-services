import { Request, Response } from 'express';
import getBooksDataService, {
	GetBooksDataService
} from '../services/get-books-data.service';

export class GetBooksDataController {
	constructor(private getBooksDataService: GetBooksDataService) {}

	getAllBooks = async (_req: Request, res: Response): Promise<void> => {
		const books = await this.getBooksDataService.fetchAllBooks();
		res.status(200).json(books);
	};

	getSingleBook = async (req: Request, res: Response): Promise<void> => {
		const bookIdAsNumber = +req.params.bookId;
		const book = await this.getBooksDataService.fetchSingleBook(bookIdAsNumber);
		res.status(200).json(book);
	};
}

export default new GetBooksDataController(getBooksDataService);
