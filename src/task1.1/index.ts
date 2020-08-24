import { Reverser } from './reverser';

const reversePipe = new Reverser();

process.stdin.pipe(reversePipe).pipe(process.stdout);
