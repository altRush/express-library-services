import { Request, Response } from 'express';
import getBooksDataService, {
  GetBooksDataService,
} from '../services/get-books-data.service';
import { SortDirection } from '../enums/sort-direction.enum';
import HttpStatusCode from '../enums/http-statuses.enum';

export class GetBooksDataController {
  constructor(private getBooksDataService: GetBooksDataService) {}

  getAllBooks = async (
    req: Request,
    res: Response,
  ): Promise<void | Response> => {
    const limit = req.query.limit ? +req.query.limit : undefined;
    const searchByName = (req.query.searchByName as string) || undefined;
    const sort = (req.query.sort as string) || undefined;

    const order = (req.query.order as string) || undefined;

    if (order) {
      if (!Object.values(SortDirection).includes(order)) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: 'Incorrect "order" value',
        });
      }
    }

    const books = await this.getBooksDataService.fetchAllBooks({
      limit,
      searchByName,
      sort,
      order,
    });

    res.status(HttpStatusCode.OK).json(books);
  };

  getSingleBook = async (req: Request, res: Response): Promise<void> => {
    const bookIdAsNumber = +req.params.bookId;
    const book = await this.getBooksDataService.fetchSingleBook(bookIdAsNumber);
    res.status(HttpStatusCode.OK).json(book);
  };
}

export default new GetBooksDataController(getBooksDataService);
