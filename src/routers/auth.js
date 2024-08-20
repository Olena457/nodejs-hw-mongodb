import { Router } from 'express';

import {
  registerController,
  loginController,
  logoutController,
  refreshSessionController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from './../middlewares/validateBody.js';
import { loginSchema, registerUserSchema } from './../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',

  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);
authRouter.post(
  '/login',

  validateBody(loginSchema),
  ctrlWrapper(loginController),
);
authRouter.post('/refresh', ctrlWrapper(refreshSessionController));
authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
