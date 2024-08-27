import Joi from 'joi';

import { EMAIL_REGEX, PHONE_REGEX } from './../constants/index.js';

const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).pattern(PHONE_REGEX),
  email: Joi.string().pattern(EMAIL_REGEX).email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  // photo: Joi.string(),
});
export default updateContactsSchema;
