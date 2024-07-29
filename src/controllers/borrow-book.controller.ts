import { Request, Response } from 'express';
import borrowBookService, {
  BorrowBookService,
} from '../services/borrow-book.service';
import { BorrowBookInfoRequest } from '../types/borrow-book.interface';
import { HttpResponseMessages } from '../enums/http-response-messages.enum';
import HttpStatusCode from '../enums/http-statuses.enum';

export class BorrowBookController {
  constructor(private borrowBookService: BorrowBookService) {}

  borrowBook = async (req: Request<BorrowBookInfoRequest>, res: Response) => {
    const { success, borrowId } = await this.borrowBookService.borrowBook(
      req.body,
    );

    if (!success) {
      return res.status(400).json({
        success,
        message: HttpResponseMessages.POST_BORROW_BOOK_FAILED,
      });
    }

    return res.status(HttpStatusCode.CREATED).json({
      success,
      message: HttpResponseMessages.POST_BORROW_BOOK_SUCCESS,
      borrowId,
    });
  };

  getBorrowBookRecord = async (req: Request, res: Response) => {
    const { success, statusCode, borrowBookRecord } =
      await this.borrowBookService.getBorrowBookRecord(req.params.personName);

    if (!success && statusCode === HttpStatusCode.NOT_FOUND) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success,
        message: HttpResponseMessages.GET_BORROW_BOOK_RECORD_NOT_FOUND,
      });
    }

    return res.status(HttpStatusCode.OK).json({
      success,
      messaage: HttpResponseMessages.GET_BORROW_BOOK_RECORD_SUCCESS,
      borrowBookRecord,
    });
  };
}

export default new BorrowBookController(borrowBookService);
