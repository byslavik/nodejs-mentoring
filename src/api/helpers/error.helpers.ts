import { ERRORS } from '../constants';
import { ErrorResponse } from '../types';
import { ValidationError } from 'sequelize';

export const createError = (type: string, message: string): ErrorResponse => ({
  type,
  message,
});

export const getErrors = (err: any): ErrorResponse[] | null => {
  let errors: ErrorResponse[] | null = null;

  if (err?.error?.isJoi || err?.error?.custom) {
    errors = [createError(ERRORS.VALIDATION_ERROR, err.error.toString())];
  }
  if (err instanceof Error) {
    errors = [createError(ERRORS.VALIDATION_ERROR, err.message)];
  }
  if (err instanceof ValidationError) {
    errors = err.errors.map((error) =>
      createError(ERRORS.VALIDATION_ERROR, error.message)
    );
  }

  return errors;
};
