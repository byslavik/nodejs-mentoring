import * as Joi from 'joi';
import {
  createValidator,
  ValidatedRequestSchema,
  ContainerTypes,
} from 'express-joi-validation';

const validator = createValidator({
  passError: true,
});

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
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  };
}

export const addUserDataValidator = validator.body(addUserSchema);
export const updateUserDataValidator = validator.body(updateUserSchema);
