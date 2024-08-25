import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  patchContact,
} from './../services/contacts.js';

import { parseSortParams } from '../utils/parseSortParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { saveFileToCloudinary } from './../utils/saveFileCloudinary';
import { parseFilterParams } from './../utils/parseFilterParams';
import saveFileToUploadDir from '../utils/createDirIfNotExists.js';
import { env } from './../utils/env';

export const getAllContactsController = async (req, res, _next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact no found');
  }
  if (contact.userId.toString() !== userId.toString()) {
    return next(createHttpError(403, 'Access denied'));
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const userId = req.user._id;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await addContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId,
    photo: photoUrl,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const result = await patchContact(contactId, req.body, userId, {
    photo: photoUrl,
  });
  if (!result) {
    next(createHttpError(404, 'Contacts not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, userId);
  if (!contact) {
    next(createHttpError(404, 'Contacts not found'));
    return;
  }
  res.status(204).send();
};
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: 'Error creating contact',
//       error: error.message,
//     });
//   }
// };
// {...payload}

// const photo = req.file;
// let photoUrl;

// if (photo) {
//   photoUrl = await saveFileToCloudinary(photo);
// }
// const contact = await addContact(payload, userId, { photo: photoUrl });

// res.status(201).json({
//   status: 201,
//   message: 'Successfully created a contact',

//   data: contact,
// });
// ______________________________
// if (photo) {
//     photoUrl = await saveFileToCloudinary(photo);
// export const patchContactController = async (req, res, next) => {
//   const userId = req.user._id;
//   const { contactId } = req.params;
//   const photo = req.file;

//   let photoUrl;

//   if (photo) {
//     if (env('ENABLE_CLOUDINARY') === 'true') {
//       photoUrl = await saveFileToCloudinary(photo);
//     } else {
//       photoUrl = await saveFileToUploadDir(photo);
//     }
//   }

//   const result = await patchContact(contactId, req.user._id, {
//     ...req.body,
//     photo: photoUrl,
//   });

//   if (!result) {
//     next(createHttpError(404, `Contact not found ${contactId}`));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: 'Successfully patched a contact!',
//     data: result.contact,
//   });
// };
