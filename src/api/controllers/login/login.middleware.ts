import { NextFunction, Request, Response } from 'express';

import { validateToken } from '../../services/login';
import { ERRORS } from '../../constants';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-control'];

  if (!token) {
    return res.status(401).json({
      message: ERRORS.MISSING_TOKEN,
    });
  }
  const authorisedUser = validateToken(String(token));
  if (token && authorisedUser) {
    return next();
  }

  return res.status(403).json({
    message: ERRORS.INVALID_TOKEN,
  });
};
