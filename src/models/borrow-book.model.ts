import { Collection, Db } from 'mongodb';
import dotenv from 'dotenv';
import db from '../services/db.service';
import { BorrowBookInfoRequest } from '../types/borrow-book.interface';

dotenv.config();

export class BorrowBookModel {
	private collection: Collection;
	constructor(private dbClient: Db, collectionName: string) {
		this.collection = this.dbClient.collection(collectionName);
	}

	async borrowBook(borrowBookInfo: BorrowBookInfoRequest) {
		const { acknowledged, insertedId } = await this.collection.insertOne({
			book_id: borrowBookInfo.bookId,
			person_name: borrowBookInfo.personName,
			date: new Date()
		});

		if (!acknowledged) {
			return {
				success: false
			};
		}

		return {
			success: true,
			borrowId: insertedId
		};
	}
}

export default new BorrowBookModel(
	db,
	process.env.MONGODB_COLLECTION_BORROW_BOOK!
);
