/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

import { ERRORS } from '../../constants';
import { createError } from '../../helpers';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json(createError(ERRORS.APP_ERROR, err.message));
};
