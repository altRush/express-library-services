import db from '../services/db.service';
import { Collection, Db, SortDirection } from 'mongodb';
import { Book } from '../types/Book';
import dotenv from 'dotenv';
import { QueryParams } from '../types/QueryParams';

dotenv.config();

export class GetBooksDataModel {
	private collection: Collection;
	constructor(private dbClient: Db, collectionName: string) {
		this.collection = this.dbClient.collection(collectionName);
	}

	async fetchAllBooks(queryParams: QueryParams): Promise<Book[]> {
		const { limit, searchByName, sort, order } = queryParams;

		const filter = searchByName
			? {
					title: searchByName
			  }
			: {};

		const allBooks = await this.collection
			.find<Book>(filter)
			.sort(sort as string, order as SortDirection)
			.limit(limit || 0)
			.toArray();
		return allBooks;
	}

	async fetchSingleBook(bookId: number): Promise<Book> {
		const book = await this.collection
			.find<Book>({
				id: bookId
			})
			.toArray();

		return book[0];
	}
}

export default new GetBooksDataModel(db, process.env.MONGODB_COLLECTION_STORE!);
