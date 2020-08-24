import express from 'express';
import bodyParser from 'body-parser';

import userRouter from './routes/users';
import { globalErrorHandler } from './mwares';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use('/user', userRouter);

app.use(globalErrorHandler);

app.listen(8080, () => {
  console.log('server is ready');
});
