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
import { isValidID } from './../middlewares/isValidId.js';

const jsonParser = express.json();
const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get(
  '/contacts/:contactId',
  isValidID,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(addContactController),
);

router.patch(
  '/contacts/:contactId',
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidID,
  ctrlWrapper(deleteContactController),
);

export default router;
