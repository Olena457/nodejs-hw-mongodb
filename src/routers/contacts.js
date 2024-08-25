import express from 'express';
import { Router } from 'express';

import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from './../controllers/contacts.js';

import { isValidId } from './../middlewares/isValidId.js';
import { validateBody } from './../middlewares/validateBody.js';
import { authenticate } from './../middlewares/auth.js';

import updateContactsSchema from './../validation/updateContactSchema.js';
import createContactsSchema from './../validation/createContactSchema.js';
import { upload } from './../middlewares/multer.js';

const router = Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  jsonParser,
  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(addContactController),
);

router.patch(
  '/:contactId',
  jsonParser,
  upload.single('photo'),
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
