import HttpStatusCode from '../enums/http-statuses.enum';
import borrowBookModel, { BorrowBookModel } from '../models/borrow-book.model';
import { BorrowBookInfoRequest } from '../types/borrow-book.interface';

export class BorrowBookService {
  constructor(private borrowBookModel: BorrowBookModel) {}

  async borrowBook(borrowBookInfo: BorrowBookInfoRequest) {
    const { acknowledged, insertedId } = await this.borrowBookModel.borrowBook(
      borrowBookInfo,
    );

    if (!acknowledged) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      borrowId: insertedId,
    };
  }

  async getBorrowBookRecord(personName: string) {
    const { statusCode, borrowBookRecord } =
      await this.borrowBookModel.getBorrowBookRecordByPersonName(personName);

    if (statusCode === HttpStatusCode.NOT_FOUND) {
      return {
        success: false,
        statusCode,
      };
    }

    return {
      success: true,
      borrowBookRecord,
    };
  }

  async getLimitExceededBorrowwers(limitDays: number) {
    const { statusCode, limitExceededBorrowers } =
      await this.borrowBookModel.getLimitExceededBorrowwers(limitDays);

    if (statusCode === HttpStatusCode.NOT_FOUND) {
      return {
        success: false,
        statusCode,
      };
    }

    return {
      success: true,
      limitExceededBorrowers,
    };
  }
}

export default new BorrowBookService(borrowBookModel);
