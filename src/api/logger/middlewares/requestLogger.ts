import { logger } from '../index';
import { NextFunction, Request, Response } from 'express';
import { sanitizeRequestParams } from '../../helpers';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `Requesting ${req.method} ${req.originalUrl} with params ${JSON.stringify(
      sanitizeRequestParams(req.body)
    )}`
  );

  next();
};

export default requestLogger;
