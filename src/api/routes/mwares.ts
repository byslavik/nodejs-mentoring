import { RequestHandler, ErrorRequestHandler } from 'express';
import { v4 as uuid } from 'uuid';

import { userStorage } from '../user-storage';
import { MESSAGES } from '../constants';

export const checkIfUserExists: RequestHandler = (req, res, next) => {
  if (!userStorage.isUserExists(req.params.id)) {
    return next({
      custom: true,
      type: 'body',
      error: MESSAGES.ERR_USER_DOES_NOT_EXIST,
    });
  }
  next();
};

export const userDataPreparation: RequestHandler = (req, res, next) => {
  const id = uuid();

  if (userStorage.isUserExists(id) || !userStorage.isLoginFree(req.body.login)) {
    return next({
      custom: true,
      type: 'body',
      error: MESSAGES.ERR_USER_EXISTS,
    });
  }
  req.body.id = id;

  next();
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err?.error?.isJoi || err?.error?.custom) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    });
  } else {
    next(err);
  }
};
