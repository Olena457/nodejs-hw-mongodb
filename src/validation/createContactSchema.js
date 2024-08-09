import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),

  phoneNumber: Joi.number().integer().min(6).max(20).required(),

  email: Joi.string().email(),

  contactType: Joi.string().valid('work', 'home', 'personal').required(),

  isFavourite: Joi.boolean(),
});
