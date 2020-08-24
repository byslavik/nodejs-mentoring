import { Transform, TransformOptions, TransformCallback } from 'stream';

export class Reverser extends Transform {
  constructor(options?: TransformOptions) {
    super(options);
    this.on('pipe', () => {
      console.log(
        'Please enter the string and I will reverse it. To finish program press CTRL + C button'
      );
    });
    this.on('error', (err) => {
      console.error(err.message);
    });
  }

  prepareChunk(chunk: Buffer): string {
    return chunk.toString('utf-8').replace(/\n|\r/, '');
  }

  processData(data: string): string {
    return data.split('').reverse().join('').concat('\n\n');
  }

  _transform(chunk: Buffer, enc: BufferEncoding, callback: TransformCallback): void {
    const data = this.prepareChunk(chunk);
    if (!data) {
      callback(null, 'Error: The input is empty \n');
      // How to work with that error?
      // callback(new Error('The input is empty'));
    } else {
      callback(null, this.processData(data));
    }
  }
}
