import * as Joi from 'joi';
import {
  createValidator,
  ValidatedRequestSchema,
  ContainerTypes,
} from 'express-joi-validation';
import { LoginSchema } from '../../types';

const validator = createValidator({
  passError: true,
});

// Create/update user validator
const loginValidatator = Joi.string().trim().pattern(/^\S*$/);
const passwordValidatator = Joi.string().pattern(/[a-zA-Z0-9]/);

const loginSchema = Joi.object({
  login: loginValidatator,
  password: passwordValidatator,
  stripUnknown: true,
});

export interface LoginRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: LoginSchema;
}

export const loginValidator = validator.body(loginSchema);
