import { Request, Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import {
  // methods
  createGroup,
  updateGroup,
  getGroup,
  getAllGroups,
  deleteGroup,
  addUsersToGroup,
  // validators
  GroupRequestSchema,
  AddUsersToGroupRequestSchema,
} from '../../services/group';

export const addUserToGroupMethod = async (
  req: ValidatedRequest<AddUsersToGroupRequestSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await addUsersToGroup(req.body.groupId, req.body.userIds);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createGroupMethod = async (
  req: ValidatedRequest<GroupRequestSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createGroup(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllGroupsMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allGroups = await getAllGroups();

    res.json(allGroups);
  } catch (err) {
    next(err);
  }
};

export const deleteGroupMethod = async (req: Request, res: Response) => {
  const result = await deleteGroup(req.params.id);

  res.json(result);
};

export const updateGroupMethod = async (
  req: ValidatedRequest<GroupRequestSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateGroup(req.params.id, req.body);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getGroupMethod = async (req: Request, res: Response) => {
  const user = await getGroup(req.params.id);

  res.json(user);
};
