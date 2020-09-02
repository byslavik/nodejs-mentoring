import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'sequelize';

import { ERRORS } from '../../constants';
import { ErrorResponse } from '../../types';
import { createError } from '../../helpers';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errors: ErrorResponse[] | null = null;

  if (err?.error?.isJoi || err?.error?.custom) {
    errors = [createError(ERRORS.VALIDATION_ERROR, err.error.toString())];
  }
  if (err instanceof ValidationError) {
    errors = err.errors.map((error) =>
      createError(ERRORS.VALIDATION_ERROR, error.message)
    );
  }
  if (errors) {
    return res.status(400).json(errors);
  }

  next(err);
};
