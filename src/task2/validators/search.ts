import * as Joi from 'joi';
import {
  createValidator,
  ValidatedRequestSchema,
  ContainerTypes,
} from 'express-joi-validation';

const validator = createValidator({
  passError: true,
});

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
