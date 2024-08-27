import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from './../middlewares/validateBody.js';

import { loginSchema, registerUserSchema } from './../validation/auth.js';
import sendResetEmailSchema from './../validation/sendResetEmailSchema.js';
import resetPwdSchema from './../validation/resetPwdSchema.js';
import {
  sendResetEmailController,
  registerUserController,
  loginUserController,
  refreshUserController,
  logoutUserController,
  resetPwdController,
} from './../controllers/auth.js';

const router = Router();

router.post(
  '/register',

  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',

  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh', ctrlWrapper(refreshUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',

  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
  '/reset-pwd',

  validateBody(resetPwdSchema),
  ctrlWrapper(resetPwdController),
);
export default router;
