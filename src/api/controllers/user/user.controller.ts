import { Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { errorHandler } from './user.errorHandling';
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

const router = Router();

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await getUser(req.params.id);

    res.json(user);
  })
  .patch(
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
  .delete(async (req, res) => {
    const result = await deleteUser(req.params.id);

    res.json(result);
  });

router
  .route('/')
  .post(
    addUserDataValidator,
    async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
      try {
        const user = await createUser(req.body);
        res.json(user);
      } catch (err) {
        next(err);
      }
    }
  );

router
  .route('/search')
  .post(
    searchUserDataValidator,
    async (req: ValidatedRequest<SearchRequestSchema>, res) => {
      const users = await searchUsers(req.body);

      res.json(users);
    }
  );

router.use(errorHandler);

export { router as userRouter };
