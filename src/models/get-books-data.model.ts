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

	async fetchAllBooks() {
		const allBooks = await this.collection.find<Book>({}).toArray();
		return allBooks;
	}
}

export default new GetBooksDataModel(db, process.env.MONGODB_COLLECTION_STORE!);
