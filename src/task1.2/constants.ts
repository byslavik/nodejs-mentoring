import { CSVParseParam } from 'csvtojson/v2/Parameters';
import { ProcessedBook } from './types';
import path from 'path';

export const CSV_PARSER_CONFIG: Partial<CSVParseParam> = {
  trim: true,
  delimiter: ';',
  colParser: {
    Price: (item) => {
      return parseFloat(item.replace(',', '.'));
    },
  },
};

export const PATH_TO_SOURCE_FILE = path.resolve(__dirname, './csv/books.csv');
export const PATH_TO_RESULT_FILE = path.resolve(__dirname, './output/result.txt');

export const PROCESSED_BOOK_FIELDS: (keyof ProcessedBook)[] = ['book', 'author', 'price'];

export const MESSAGES = {
  SUCCESS: 'File successfully saved.',
  ERROR: 'Error during file processing.',
  PROCESSOR_PIPED: 'Book processor is piped.',
  PROCESSOR_DATA: 'Getting chunk of data.',
};

export const FLAGS = {
  STREAM: '--stream',
  RAM: '--ram',
};

export const STREAM_PROCESSING_FLAGS = {
  SUBSCRIBE: 'subscribe',
  TRANSFORM: 'transform',
};
