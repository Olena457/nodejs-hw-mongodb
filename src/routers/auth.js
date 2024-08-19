import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  refreshSessionController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from './../middlewares/validateBody.js';
import { loginSchema, registerUserSchema } from './../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);
router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);
router.post('/logout', ctrlWrapper(logoutController));
router.post('/refresh', ctrlWrapper(refreshSessionController));

export default router;
