import HttpError from 'http-errors';

export const errorHandler = (err, req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
// import { isHttpError } from 'http-errors';

// export async function errorHandler(error, req, res, next) {
//   if (isHttpError(error) === true) {
//     return res.status(error.status).send({
//       status: error.status,
//       message: error.message,
//     });
//   }

//   console.error(error);

//   res.status(500).send({ status: 500, message: 'Internal Server Error' });
// }
// // import HttpError from 'http-errors';

// // export const errorHandler = (err, req, res, _next) => {
// //   if (err instanceof HttpError) {
// //     res.status(err.status).json({
// //       status: err.status,
// //       message: err.message,
// //       data: err,
// //     });
// //     return;
// //   }

// //   res.status(500).json({
// //     status: 500,
// //     message: 'Something went wrong',
// //     error: err.message,
// //   });
// // };

// // import { MongooseError } from 'mongoose';
// // if (err instanceof MongooseError) {
// //   res.status(500).json({
// //     status: err.status,
// //     message: 'Mongoose error',
// //     data: err,
// //   });
// //   return;
// // }
