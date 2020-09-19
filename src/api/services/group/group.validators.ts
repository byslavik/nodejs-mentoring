import * as Joi from 'joi';
import {
  createValidator,
  ValidatedRequestSchema,
  ContainerTypes,
} from 'express-joi-validation';

import { GROUP_TYPES } from '../../constants';
import { Group } from './../../models';

const validator = createValidator({
  passError: true,
});

// Create/update group validator
const permission = Joi.string()
  .trim()
  .valid(...GROUP_TYPES);
const groupPermissionValidatator = Joi.array().items(permission);
const nameValidatator = Joi.string().pattern(/[a-zA-Z0-9]/);

const addGroupSchema = Joi.object({
  permissions: groupPermissionValidatator.required(),
  name: nameValidatator.required(),
  stripUnknown: true,
});

const updateGroupSchema = Joi.object({
  permissions: groupPermissionValidatator,
  name: nameValidatator,
  stripUnknown: true,
});

const addUserstoGroupSchema = Joi.object({
  groupId: nameValidatator.required(),
  userIds: Joi.array().items(nameValidatator).required(),
  stripUnknown: true,
});

export interface GroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Group;
}
export interface AddUsersToGroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    userIds: string[];
    groupId: string;
  };
}

export const addGroupDataValidator = validator.body(addGroupSchema);
export const updateGroupDataValidator = validator.body(updateGroupSchema);
export const addUserstoGroupValidator = validator.body(addUserstoGroupSchema);
