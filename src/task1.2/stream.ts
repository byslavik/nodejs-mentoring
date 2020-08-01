import csv from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { BookProcessor } from './book-processor';
import {
  PATH_TO_RESULT_FILE,
  PATH_TO_SOURCE_FILE,
  CSV_PARSER_CONFIG,
  MESSAGES,
} from './constants';

const readableStream = createReadStream(PATH_TO_SOURCE_FILE, 'utf-8');
const writeableStream = createWriteStream(PATH_TO_RESULT_FILE, 'utf-8');

const processFileChunks = new BookProcessor();

export const streamProcessing = () =>
  pipeline(
    readableStream,
    csv(CSV_PARSER_CONFIG),
    processFileChunks,
    writeableStream,
    (error) => {
      if (error) {
        console.error(MESSAGES.ERROR, error);
      }
      console.log(MESSAGES.SUCCESS);
    }
  );
