import { Request, Response } from 'express';
import borrowBookService, {
	BorrowBookService
} from '../services/borrow-book.service';
import { BorrowBookInfoRequest } from '../types/borrow-book.interface';
import { HttpResponseMessages } from '../enums/http-response-messages.enum';
import HttpStatusCode from '../enums/http-statuses.enum';

export class BorrowBookController {
	constructor(private borrowBookService: BorrowBookService) {}

	borrowBook = async (req: Request<BorrowBookInfoRequest>, res: Response) => {
		const { success, borrowId } = await this.borrowBookService.borrowBook(
			req.body
		);

		if (!success) {
			return res.status(400).json({
				success,
				message: HttpResponseMessages.POST_BORROW_BOOK_FAILED
			});
		}

		return res.status(HttpStatusCode.CREATED).json({
			success,
			message: HttpResponseMessages.POST_BORROW_BOOK_SUCCESS,
			borrowId
		});
	};
}

export default new BorrowBookController(borrowBookService);
