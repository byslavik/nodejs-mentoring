import { IncomingBook, ProcessedBook } from './types';
import { PROCESSED_BOOK_FIELDS } from './constants';

export const prepareBookData = (book: IncomingBook): ProcessedBook =>
  Object.keys(book).reduce((acc: any, item) => {
    const key = item.toLowerCase() as keyof ProcessedBook;

    if (PROCESSED_BOOK_FIELDS.includes(key)) {
      const newKeyValue = book[item as keyof IncomingBook];

      return { ...acc, [key]: newKeyValue };
    }
    return acc;
  }, {} as ProcessedBook);

export const processBookData = (books: IncomingBook[]): ProcessedBook[] =>
  books.map(prepareBookData);

export const stringifyBookRow = (book: ProcessedBook): string =>
  JSON.stringify(book).concat('\n');

export const csvSubscribeProcessor = (book: any) => {
  Object.assign(book, prepareBookData(book));
  delete book.Author;
  delete book.Book;
  delete book.Price;
  delete book.Amount;
};
