import { Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { errorHandler } from './user.errorHandling';
import { logger } from '../../logger';
import performanceLogger from '../../logger/middlewares/performanceLogger';
import errorLogger from '../../logger/middlewares/errorLogger';
import {
  // methods
  createUser,
  updateUser,
  getUser,
  deleteUser,
  searchUsers,
  // validators
  addUserDataValidator,
  updateUserDataValidator,
  UserRequestSchema,
  searchUserDataValidator,
  SearchRequestSchema,
} from '../../services/user';
import { errorFormatter } from '../global/global.errors';

const router = Router();

router
  .route('/:id')
  .get(performanceLogger, async (req, res) => {
    const user = await getUser(req.params.id);

    res.json(user);
  })
  .patch(
    performanceLogger,
    updateUserDataValidator,
    async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
      try {
        const user = await updateUser(req.params.id, req.body);

        res.json(user);
      } catch (err) {
        next(err);
      }
    }
  )
  .delete(performanceLogger, async (req, res) => {
    const result = await deleteUser(req.params.id);

    res.json(result);
  });

router
  .route('/')
  .post(
    performanceLogger,
    addUserDataValidator,
    async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
      try {
        const user = await createUser(req.body);
        logger.info(user);
        res.json(user);
      } catch (err) {
        next(err);
      }
    }
  );

router
  .route('/search')
  .post(
    performanceLogger,
    searchUserDataValidator,
    async (req: ValidatedRequest<SearchRequestSchema>, res) => {
      const users = await searchUsers(req.body);

      res.json(users);
    }
  );

router.use(errorFormatter, errorLogger, errorHandler);

export { router as userRouter };
