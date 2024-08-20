import Joi from 'joi';

import { EMAIL_REGEX } from './../constants/index.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().pattern(EMAIL_REGEX).required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().pattern(EMAIL_REGEX).required(),
  password: Joi.string().required(),
});
