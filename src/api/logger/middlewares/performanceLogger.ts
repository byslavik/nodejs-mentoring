import { logger } from '..';
import { NextFunction, Request, Response } from 'express';

const getCalculatedTime = (diff: number[]) => {
  const [seconds, nanoseconds] = diff;

  return (seconds * 1e9 + nanoseconds) / 1e6;
};

const performanceLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);

    logger.info(`${req.method} ${req.originalUrl} took ${getCalculatedTime(diff)} ms`);
  });

  next();
};

export default performanceLogger;
