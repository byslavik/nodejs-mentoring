import { streamProcessing } from './stream';
import { ramProcessing } from './ram';
import { FLAGS } from './constants';

const flag = process.argv[2];

switch (true) {
  case flag.includes(FLAGS.RAM):
    ramProcessing();
    break;
  case flag.includes(FLAGS.STREAM):
    streamProcessing();
    break;
  default:
    console.warn(
      'Please use one of the following flags',
      Object.values(FLAGS).join(', ')
    );
}
