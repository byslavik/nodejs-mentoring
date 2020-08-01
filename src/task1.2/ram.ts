import csv from 'csvtojson';
import { readFile, writeFile } from 'fs';
import { ProcessedBook } from './types';
import {
  PATH_TO_RESULT_FILE,
  PATH_TO_SOURCE_FILE,
  CSV_PARSER_CONFIG,
  MESSAGES,
} from './constants';
import { stringifyBookRow, processBookData } from './helpers';

const writeToFile = (data: ProcessedBook[]) =>
  writeFile(
    PATH_TO_RESULT_FILE,
    data.map(stringifyBookRow).join(''),
    (error) => {
      if (error) {
        console.error(MESSAGES.ERROR);
        return;
      }
      console.log(MESSAGES.SUCCESS);
    }
  );

export const ramProcessing = () =>
  readFile(PATH_TO_SOURCE_FILE, 'utf-8', (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    csv(CSV_PARSER_CONFIG)
      .fromString(data)
      .then(processBookData)
      .then(writeToFile);
  });
