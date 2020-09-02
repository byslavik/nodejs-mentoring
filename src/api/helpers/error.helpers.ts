import { ErrorResponse } from '../types';

export const createError = (type: string, message: string): ErrorResponse => ({
  type,
  message,
});
