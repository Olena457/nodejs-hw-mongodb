import express from 'express';
import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  resetPwdController,
} from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from './../middlewares/validateBody.js';
import { sendResetEmailController } from './../controllers/auth.js';
import { loginSchema, registerUserSchema } from './../validation/auth.js';
import sendResetEmailSchema from './../validation/sendResetEmailSchema.js';
import resetPwdSchema from './../validation/resetPwdSchema.js';

const router = Router();
const jsonParser = express.json();
router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh', ctrlWrapper(refreshUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPwdSchema),
  ctrlWrapper(resetPwdController),
);
export default router;
