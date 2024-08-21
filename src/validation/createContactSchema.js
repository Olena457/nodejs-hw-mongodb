import Joi from 'joi';

import { EMAIL_REGEX, PHONE_REGEX } from './../constants/index.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'name is required',
    'string.base': 'name should be a string',
    'string.min': 'name should be at least {#limit}',
    'string.max': 'name should be at most {#limit}',
  }),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .pattern(PHONE_REGEX)
    .required()
    .messages({
      'string.base': 'Phone number is required',
      'string.pattern.base':
        'Phone number must include only numbers and start with "+"',
      'string.max': 'Phone number should be at most {#limit}',
      'string.min': 'Phone number should be at least {#limit}',
    }),

  email: Joi.string().min(3).max(20).email().pattern(EMAIL_REGEX).messages({
    'string.email': 'Email is not valid',
    'string.min': 'Email should be at least {#limit}',
    'string.max': 'Email should be at most {#limit}',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be one of [ true, false ]',
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('personal', 'work', 'home')
    .required()
    .messages({
      'any.required': 'contactType is required',
      'any.only': 'contactType must be on of [ personal, work, home ]',
      'string.min': 'phoneNumber should be at least {#limit}',
      'string.max': 'phoneNumber should be at most {#limit}',
    }),
});
