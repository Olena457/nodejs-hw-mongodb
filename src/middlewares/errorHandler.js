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

// import HttpError from 'http-errors';

// export const errorHandler = (err, req, res, _next) => {
//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       status: err.status,
//       message: err.message,
//       data: err,
//     });
//     return;
//   }

//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     error: err.message,
//   });
// };

// import { MongooseError } from 'mongoose';
// if (err instanceof MongooseError) {
//   res.status(500).json({
//     status: err.status,
//     message: 'Mongoose error',
//     data: err,
//   });
//   return;
// }
