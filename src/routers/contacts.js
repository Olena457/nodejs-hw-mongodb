import { Router } from 'express';
import express from 'express';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from './../controllers/contacts.js';

import { updateContactSchema } from './../validation/updateContactSchema.js';
import { createContactSchema } from './../validation/createContactSchema.js';
import { validateBody } from './../middlewares/validateBody.js';
import isValidId from './../middlewares/isValidId.js';
import { authenticate } from './../middlewares/auth.js';

const jsonParser = express.json();
const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(addContactController),
);

router.patch(
  '/:contactId',
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
