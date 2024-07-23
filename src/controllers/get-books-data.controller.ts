import { Request, Response } from 'express';
import getBooksDataService, {
	GetBooksDataService
} from '../services/get-books-data.service';

export class GetBooksDataController {
	constructor(private getBooksDataServices: GetBooksDataService) {}

	getAllBooks = async (_req: Request, res: Response) => {
		const books = await this.getBooksDataServices.fetchAllBooks();
		res.status(200).json(books);
	};
}

export default new GetBooksDataController(getBooksDataService);
