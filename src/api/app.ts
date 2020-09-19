import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from './swagger.json';
import { userRouter, groupRouter, globalErrorHandler } from './controllers';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/group', groupRouter);

app.use(globalErrorHandler);

export default app;
