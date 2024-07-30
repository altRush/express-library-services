import { Book } from '../interfaces/book.interface';
import { QueryParams } from '../interfaces/query-params.interface';
import getBooksDataModel, {
  GetBooksDataModel,
} from '../models/get-books-data.model';

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
