import * as Joi from 'joi';
import {
  createValidator,
  ValidatedRequestSchema,
  ContainerTypes,
} from 'express-joi-validation';
import { User } from '../../models';

const validator = createValidator({
  passError: true,
});

// Create/update user validator
const loginValidatator = Joi.string().trim().pattern(/^\S*$/);
const passwordValidatator = Joi.string().pattern(/[a-zA-Z0-9]/);
const ageValidatator = Joi.number().integer().min(4).max(130);

const addUserSchema = Joi.object({
  login: loginValidatator.required(),
  password: passwordValidatator.required(),
  age: ageValidatator.required(),
  stripUnknown: true,
});

const updateUserSchema = Joi.object({
  login: loginValidatator,
  password: passwordValidatator,
  age: ageValidatator,
  stripUnknown: true,
});

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: User;
}

export const addUserDataValidator = validator.body(addUserSchema);
export const updateUserDataValidator = validator.body(updateUserSchema);

// Search user request validator
const querySchema = Joi.object({
  query: Joi.string().trim().pattern(/^\S*$/).required(),
  limit: Joi.number().integer().min(0).max(100).required(),
  stripUnknown: true,
});

export interface SearchRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    query: string;
    limit: number;
  };
}

export const searchUserDataValidator = validator.body(querySchema);
