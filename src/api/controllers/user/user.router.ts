import { Router } from 'express';

import { errorHandler } from './user.errorHandling';
import performanceLogger from '../../logger/middlewares/performanceLogger';
import errorLogger from '../../logger/middlewares/errorLogger';
import {
  // validators
  addUserDataValidator,
  updateUserDataValidator,
  searchUserDataValidator,
} from '../../services/user';
import { errorFormatter } from '../global/global.errors';
import {
  getUserMethod,
  createUserMethod,
  deleteUserMethod,
  updateUserMethod,
  searchUsersMethod,
} from './user.controller';

const router = Router();

router
  .route('/:id')
  .get(performanceLogger, getUserMethod)
  .patch(performanceLogger, updateUserDataValidator, createUserMethod)
  .delete(performanceLogger, deleteUserMethod);

router.route('/').post(performanceLogger, addUserDataValidator, updateUserMethod);

router
  .route('/search')
  .post(performanceLogger, searchUserDataValidator, searchUsersMethod);

router.use(errorFormatter, errorLogger, errorHandler);

export { router as userRouter };
