import { Collection, Db } from 'mongodb';
import dotenv from 'dotenv';
import db from '../services/db.service';
import { BorrowBookInfoRequest } from '../types/borrow-book.interface';
import { HttpResponseMessages } from '../enums/http-response-messages.enum';
import HttpStatusCode from '../enums/http-statuses.enum';

dotenv.config();

export class BorrowBookModel {
  private collection: Collection;
  constructor(private dbClient: Db, collectionName: string) {
    this.collection = this.dbClient.collection(collectionName);
  }

  async borrowBook(borrowBookInfo: BorrowBookInfoRequest) {
    return await this.collection.insertOne({
      book_id: borrowBookInfo.bookId,
      person_name: borrowBookInfo.personName,
      date: new Date(),
    });
  }

  async getBorrowBookRecordByPersonName(personName: string) {
    const pipeline = [
      {
        $match: {
          person_name: personName,
        },
      },
      {
        $lookup: {
          from: 'store',
          localField: 'book_id',
          foreignField: 'id',
          as: 'borrowDetails',
        },
      },
      {
        $project: {
          _id: 0,
          person_name: 1,
          title: '$borrowDetails.title',
          date: 1,
        },
      },
    ];

    const borrowBookRecord = await this.collection
      .aggregate(pipeline)
      .toArray();

    if (borrowBookRecord.length < 1) {
      return {
        statusCode: HttpStatusCode.NOT_FOUND,
      };
    }

    return {
      statusCode: HttpStatusCode.OK,
      borrowBookRecord,
    };
  }

  async getLimitExceededBorrowwers(limitDays: number) {
    const pipeline = [
      {
        $match: {
          $expr: {
            $gte: [
              {
                $dateDiff: {
                  startDate: '$date',
                  endDate: '$$NOW',
                  unit: 'day',
                },
              },
              limitDays,
            ],
          },
        },
      },
      {
        $project: {
          person_name: 1,
          date: 1,
          dateDiff: {
            $dateDiff: { startDate: '$date', endDate: '$$NOW', unit: 'day' },
          },
        },
      },
    ];

    const limitExceededBorrowers = await this.collection
      .aggregate(pipeline)
      .sort({ dateDiff: -1 })
      .toArray();

    if (limitExceededBorrowers.length < 1) {
      return {
        statusCode: HttpStatusCode.NOT_FOUND,
      };
    }

    return {
      statusCode: HttpStatusCode.OK,
      limitExceededBorrowers,
    };
  }
}

export default new BorrowBookModel(
  db,
  process.env.MONGODB_COLLECTION_BORROW_BOOK!,
);
