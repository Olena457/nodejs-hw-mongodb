import createHttpError from 'http-errors';

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false });

    if (typeof result.error !== 'undefined') {
      return next(
        createHttpError(
          400,
          result.error.details.map((err) => err.message).join(', '),
        ),
      );
    }

    next();
  };
}

// export const validateBody = (schema) => async (req, res, next) => {
//   try {
//     await schema.validateAsync(req.body, {
//       abortEarly: false,
//     });
//     next();
//   } catch (err) {
//     const error = createHttpError(400, 'Bad Request', {
//       error: err.details,
//     });
//     next(error);
//   }
// };

// export function validateBody(schema) {
//   return async (req, res, next) => {
//     try {
//       await schema.validateAsync(req.body, { abortEarly: false });
//       next();
//     } catch (error) {
//       console.log({ message: error.message });
//       console.log({ details: error.details });

//       next(
//         createHttpError(
//           400,
//           error.details.map((err) => err.message).join(', '),
//         ),
//       );
//     }
//   };
// }
