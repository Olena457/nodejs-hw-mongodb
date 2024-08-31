import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
const PORT = Number(env('PORT', 8081));
// allowed routes
const allowedOrigins = [
  //local host for testing
  'http://127.0.0.1:8080',
  'http://localhost:8080',
  'http://localhost:3000',

  //deploy
  'https://contacts-app-aoek.onrender.com',
];

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: function (origin, callback) {
        //  checking  the list for`origin`
        if (allowedOrigins.includes(origin) || !origin) {
          // requesr is allowed
          callback(null, true);
        } else {
          // request is forbidden
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, // allowed cookies
    }),
  );

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);
  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World!',
//   });
// });
