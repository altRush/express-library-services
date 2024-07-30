export enum HttpResponseMessages {
  POST_BORROW_BOOK_SUCCESS = 'Successfully added a borrowing record',
  POST_BORROW_BOOK_FAILED = 'Failed to add a borrowing record',
  GET_BORROW_BOOK_RECORD_SUCCESS = 'Successfully retrieved borrow book record',
  GET_BORROW_BOOK_RECORD_FAILED = 'Failed to retrieve borrow book record',
  GET_BORROW_BOOK_RECORD_NOT_FOUND = 'Failed to retrieve borrow book record (record not found)',
  GET_EXCEEDED_LIMIT_BORROWERS_FAILED = 'Failed to retrieve exceeded limit borrowers',
  GET_EXCEEDED_LIMIT_BORROWERS_NOT_FOUND = 'Failed to retrieve exceeded limit borrowers (exceeded borrower not found)',
  GET_EXCEEDED_LIMIT_BORROWERS_NAN = 'Failed to retrieve exceeded limit borrowers (day is not a number)',
}
