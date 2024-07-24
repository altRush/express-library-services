import db from '../services/db.service';
import { Collection, Db } from 'mongodb';
import { Book } from '../types/Book';
import dotenv from 'dotenv';

dotenv.config();

export class GetBooksDataModel {
	private collection: Collection;
	constructor(private dbClient: Db, collectionName: string) {
		this.collection = this.dbClient.collection(collectionName);
	}

	async fetchAllBooks(): Promise<Book[]> {
		const allBooks = await this.collection.find<Book>({}).toArray();
		return allBooks;
	}

	async fetchSingleBook(bookId: number): Promise<Book> {
		const book = await this.collection
			.find<Book>({
				id: bookId
			})
			.limit(1)
			.toArray();

		return book[0];
	}
}

export default new GetBooksDataModel(db, process.env.MONGODB_COLLECTION_STORE!);
