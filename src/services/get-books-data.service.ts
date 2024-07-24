import getBooksDataModel, {
	GetBooksDataModel
} from '../models/get-books-data.model';
import { Book } from '../types/Book';

export class GetBooksDataService {
	constructor(private getBooksDataModel: GetBooksDataModel) {}

	async fetchAllBooks(): Promise<Book[]> {
		return await this.getBooksDataModel.fetchAllBooks();
	}

	async fetchSingleBook(bookId: number): Promise<Book> {
		return await this.getBooksDataModel.fetchSingleBook(bookId);
	}
}
export default new GetBooksDataService(getBooksDataModel);
