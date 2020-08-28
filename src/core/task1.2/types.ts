export interface IncomingBook {
  Book: string;
  Author: string;
  Amount: string;
  Price: string;
}

export interface ProcessedBook {
  book: string;
  author: string;
  price: number;
}
