import express from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';

import swaggerDocument from './swagger.json';
import {
  userRouter,
  groupRouter,
  globalErrorHandler,
  authRouter,
  authMiddleware,
} from './controllers';
import requestLogger from './logger/middlewares/requestLogger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/user', authMiddleware, userRouter);
app.use('/api/v1/group', authMiddleware, groupRouter);
app.use('/api/v1/auth', authRouter);

app.use(globalErrorHandler);

export default app;
