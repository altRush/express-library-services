import getBooksDataModel, {
	GetBooksDataModel
} from '../models/get-books-data.model';

export class GetBooksDataService {
	constructor(private getBooksDataModel: GetBooksDataModel) {}

	async fetchAllBooks() {
		return await this.getBooksDataModel.fetchAllBooks();
	}
}
export default new GetBooksDataService(getBooksDataModel);
