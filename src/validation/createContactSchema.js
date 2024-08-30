import Joi from 'joi';

import { EMAIL_REGEX, PHONE_REGEX } from './../constants/index.js';

const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
    'any.required': 'Name should be exists',
  }),
  phoneNumber: Joi.string().pattern(PHONE_REGEX).required(),
  email: Joi.string().pattern(EMAIL_REGEX).email(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  photo: Joi.string(),
});
export default createContactsSchema;
