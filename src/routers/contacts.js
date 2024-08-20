import { Router } from 'express';

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

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',

  validateBody(createContactSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  '/:contactId',

  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
