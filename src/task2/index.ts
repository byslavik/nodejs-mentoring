import express from 'express';

import userRouter from './routes/users';
import { globalErrorHandler } from './mwares';

const app = express();

app.use(express.json());
app.use('/user', userRouter);

app.use(globalErrorHandler);

app.listen(8080, () => {
  console.log('server is ready');
});
