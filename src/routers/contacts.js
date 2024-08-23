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
import { upload } from './../middlewares/multer';
import updateContactsSchema from './../validation/updateContactSchema.js';
import createContactsSchema from './../validation/createContactSchema.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(addContactController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
