import csv from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
// import { BookProcessor } from './book-processor';
import { csvSubscribeProcessor } from './helpers';
import {
  PATH_TO_RESULT_FILE,
  PATH_TO_SOURCE_FILE,
  CSV_PARSER_CONFIG,
  MESSAGES,
} from './constants';

const readableStream = createReadStream(PATH_TO_SOURCE_FILE, 'utf-8');
const writeableStream = createWriteStream(PATH_TO_RESULT_FILE, 'utf-8');

export const streamProcessing = () => {
  const csvParser = csv(CSV_PARSER_CONFIG);

  pipeline(
    readableStream,
    csvParser.subscribe(csvSubscribeProcessor),
    // Following lines is an alternative way to deal with transforms
    // csvParser,
    // new BookProcessor(),
    writeableStream,
    (error) => {
      if (error) {
        console.error(MESSAGES.ERROR, error);
      }
      console.log(MESSAGES.SUCCESS);
    }
  );
};
