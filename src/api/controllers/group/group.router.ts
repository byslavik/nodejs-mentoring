import {
  getGroupMethod,
  updateGroupMethod,
  deleteGroupMethod,
  getAllGroupsMethod,
  createGroupMethod,
  addUserToGroupMethod,
} from './group.controller';
import { Router } from 'express';

import { errorHandler } from './group.errorHandling';
import { errorFormatter } from '../global/global.errors';

import performanceLogger from '../../logger/middlewares/performanceLogger';
import errorLogger from '../../logger/middlewares/errorLogger';
import {
  // validators
  addGroupDataValidator,
  updateGroupDataValidator,
  addUserstoGroupValidator,
} from '../../services/group';

const router = Router();

router
  .route('/:id')
  .get(performanceLogger, getGroupMethod)
  .patch(performanceLogger, updateGroupDataValidator, updateGroupMethod)
  .delete(deleteGroupMethod);

router
  .route('/')
  .get(performanceLogger, getAllGroupsMethod)
  .post(performanceLogger, addGroupDataValidator, createGroupMethod);

router
  .route('/addUsersToGroup')
  .post(performanceLogger, addUserstoGroupValidator, addUserToGroupMethod);

router.use(errorFormatter, errorLogger, errorHandler);

export { router as groupRouter };
