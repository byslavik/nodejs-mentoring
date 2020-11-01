import { ValidatedRequest } from 'express-joi-validation';
import { Request, Response, NextFunction } from 'express';

import { logger } from '../../logger';
import {
  // methods
  createUser,
  updateUser,
  getUser,
  deleteUser,
  searchUsers,
  // validators
  UserRequestSchema,
  SearchRequestSchema,
} from '../../services/user';

export const getUserMethod = async (req: Request, res: Response) => {
  const user = await getUser(req.params.id);

  res.json(user);
};

export const updateUserMethod = async (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateUser(req.params.id, req.body);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUserMethod = async (req: Request, res: Response) => {
  const result = await deleteUser(req.params.id);

  res.json(result);
};

export const createUserMethod = async (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);
    logger.info(user);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const searchUsersMethod = async (
  req: ValidatedRequest<SearchRequestSchema>,
  res: Response
) => {
  const users = await searchUsers(req.body);

  res.json(users);
};
