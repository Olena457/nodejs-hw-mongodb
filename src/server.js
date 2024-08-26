import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', 8081));

export const setupServer = () => {
  const app = express();
  // app.use(express.json());
  // app.use(express.json({ type: ['application/json'] }));
  app.use(cors());

  app.use(cookieParser());

  app.use('upload', express.static(UPLOAD_DIR));

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // app.get('/', (req, res) => {
  //   res.json({
  //     message: 'Hello World!',
  //   });
  // });

  app.use(router);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
