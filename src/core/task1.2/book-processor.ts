import { MESSAGES } from './constants';
import { IncomingBook } from './types';
import { Transform, TransformCallback, TransformOptions } from 'stream';
import { stringifyBookRow, prepareBookData } from './helpers';

export class BookProcessor extends Transform {
  constructor(options?: TransformOptions) {
    super(options);
    this.on('pipe', () => {
      console.log(MESSAGES.PROCESSOR_PIPED);
    });
    this.on('data', () => {
      console.log(MESSAGES.PROCESSOR_DATA);
    });
  }
  _transform(chunk: Buffer, enc: BufferEncoding, callback: TransformCallback): void {
    const book: IncomingBook = JSON.parse(chunk.toString());

    callback(null, stringifyBookRow(prepareBookData(book)));
  }
}
