import { streamProcessing } from './stream';
import { ramProcessing } from './ram';
import { FLAGS } from './constants';

switch (process.argv[2]) {
  case FLAGS.RAM:
    ramProcessing();
    break;
  case FLAGS.STREAM:
    streamProcessing();
    break;
  default:
    console.warn(
      'Please use one of the following flags',
      Object.values(FLAGS).join(', ')
    );
}
