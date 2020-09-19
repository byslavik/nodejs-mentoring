import { Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { errorHandler } from './group.errorHandling';
import {
  // methods
  createGroup,
  updateGroup,
  getGroup,
  getAllGroups,
  deleteGroup,
  addUsersToGroup,
  // validators
  addGroupDataValidator,
  updateGroupDataValidator,
  addUserstoGroupValidator,
  GroupRequestSchema,
  AddUsersToGroupRequestSchema,
} from '../../services/group';

const router = Router();

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await getGroup(req.params.id);

    res.json(user);
  })
  .patch(
    updateGroupDataValidator,
    async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
      try {
        const user = await updateGroup(req.params.id, req.body);

        res.json(user);
      } catch (err) {
        next(err);
      }
    }
  )
  .delete(async (req, res) => {
    const result = await deleteGroup(req.params.id);

    res.json(result);
  });

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const allGroups = await getAllGroups();

      res.json(allGroups);
    } catch (err) {
      next(err);
    }
  })
  .post(
    addGroupDataValidator,
    async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
      try {
        const user = await createGroup(req.body);
        res.json(user);
      } catch (err) {
        next(err);
      }
    }
  );

router
  .route('/addUsersToGroup')
  .post(
    addUserstoGroupValidator,
    async (req: ValidatedRequest<AddUsersToGroupRequestSchema>, res, next) => {
      try {
        const user = await addUsersToGroup(req.body.groupId, req.body.userIds);
        res.json(user);
      } catch (err) {
        next(err);
      }
    }
  );

router.use(errorHandler);

export { router as groupRouter };
