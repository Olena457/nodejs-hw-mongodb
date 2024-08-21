import Joi from 'joi';

// export const updateContactSchema = Joi.object({
//   name: Joi.string().min(3).max(20).messages({
//     'string.base': 'name should be a string',
//     'string.min': 'name should be at least {#limit}',
//     'string.max': 'name should be at most {#limit}',
//   }),
//   phoneNumber: Joi.string()
//     .min(3)
//     .max(20)
//     .pattern(/^[0-9]+$/, 'numbers')
//     .messages({
//       'string.pattern.base':
//         'phoneNumber must includes only numbers and starts with "+"',
//       'string.min': 'phoneNumber should be at least {#limit}',
//       'string.max': 'phoneNumber should be at most {#limit}',
//     }),

//   email: Joi.string().min(3).max(20).email().messages({
//     'string.email': 'email is not valid',
//     'string.min': 'phoneNumber should be at least {#limit}',
//     'string.max': 'phoneNumber should be at most {#limit}',
//   }),

//   isFavourite: Joi.boolean().messages({
//     'boolean.base': 'isFavourite should be one of [ true, false ]',
//   }),

//   contactType: Joi.string()
//     .min(3)
//     .max(20)
//     .valid('personal', 'work', 'home')
//     .messages({
//       'any.only': 'contactType must be on of [ personal, work, home ]',
//       'string.min': 'phoneNumber should be at least {#limit}',
//       'string.max': 'phoneNumber should be at most {#limit}',
//     }),
// });
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
