import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    return res.status(400).json(err);
  }

  next(err);
};
