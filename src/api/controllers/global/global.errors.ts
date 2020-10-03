/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

import { logger } from '../../logger';
import { ERRORS } from '../../constants';
import { createError, getErrors } from '../../helpers';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const error = createError(ERRORS.APP_ERROR, err.message);
  logger.error(JSON.stringify(error));
  res.status(500).json(error);
};

export const errorFormatter: ErrorRequestHandler = (err, req, res, next) => {
  next(getErrors(err));
};
