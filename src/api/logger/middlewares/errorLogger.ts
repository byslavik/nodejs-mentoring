import { logger } from '../index';
import { NextFunction, Request, Response } from 'express';
import { sanitizeRequestParams } from '../../helpers';

const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(
    `Error Requesting ${req.method} ${req.originalUrl} with params ${JSON.stringify(
      sanitizeRequestParams(req.body)
    )} Error: ${JSON.stringify(err)}`
  );

  next(err);
};

export default errorLogger;
