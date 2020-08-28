import { Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { userStorage } from '../user-storage';
import {
  addUserDataValidator,
  updateUserDataValidator,
  UserRequestSchema,
} from '../validators/user';
import { searchUserDataValidator, SearchRequestSchema } from '../validators/search';

import { checkIfUserExists, userDataPreparation, errorHandler } from './mwares';

const router = Router();

router
  .route('/:id')
  .get((req, res) => {
    res.json(userStorage.getUser(req.params.id));
  })
  .patch(
    updateUserDataValidator,
    checkIfUserExists,
    (req: ValidatedRequest<UserRequestSchema>, res) => {
      res.json(userStorage.update(req.params.id, req.body));
    }
  )
  .delete(checkIfUserExists, (req, res) => {
    res.send(userStorage.remove(req.params.id));
  });

router.route('/').post(addUserDataValidator, userDataPreparation, (req, res) => {
  res.json(userStorage.create(req.body));
});

router
  .route('/search')
  .post(searchUserDataValidator, (req: ValidatedRequest<SearchRequestSchema>, res) => {
    const { query, limit } = req.body;

    res.json(userStorage.getSuggestions(query, limit));
  });

router.use(errorHandler);

export default router;
