import borrowBookModel, { BorrowBookModel } from '../models/borrow-book.model';
import { BorrowBookInfoRequest } from '../types/borrow-book.interface';

export class BorrowBookService {
  constructor(private borrowBookModel: BorrowBookModel) {}

  async borrowBook(borrowBookInfo: BorrowBookInfoRequest) {
    const { success, borrowId } = await this.borrowBookModel.borrowBook(
      borrowBookInfo,
    );

    if (!success) {
      return {
        success,
      };
    }

    return {
      success,
      borrowId,
    };
  }
}

export default new BorrowBookService(borrowBookModel);
