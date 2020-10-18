import { logger } from '../index';
import { NextFunction, Request, Response } from 'express';

const sanitizeRequestParams = (body: any) => ({
  ...body,
  password: body.password.replace(/./g, '*'),
});

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `Requesting ${req.method} ${req.originalUrl} with params ${JSON.stringify(
      sanitizeRequestParams(req.body)
    )}`
  );

  next();
};

export default requestLogger;
