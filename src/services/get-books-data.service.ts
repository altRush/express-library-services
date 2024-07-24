import getBooksDataModel, {
	GetBooksDataModel
} from '../models/get-books-data.model';
import { Book } from '../types/Book';
import { QueryParams } from '../types/QueryParams';

export class GetBooksDataService {
	constructor(private getBooksDataModel: GetBooksDataModel) {}

	async fetchAllBooks(queryParams: QueryParams): Promise<Book[]> {
		return await this.getBooksDataModel.fetchAllBooks(queryParams);
	}

	async fetchSingleBook(bookId: number): Promise<Book> {
		return await this.getBooksDataModel.fetchSingleBook(bookId);
	}
}
export default new GetBooksDataService(getBooksDataModel);
