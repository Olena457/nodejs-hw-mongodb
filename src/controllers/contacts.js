import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  patchContact,
} from './../services/contacts.js';

import { parseFilterParams } from './../utils/parseFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllContactsController = async (req, res, _next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
// if (contacts.length === 0) {
//   next(createHttpError(404, 'Contacts not found'));
//   return;
// }
// if (page > contacts.totalPages) {
//   next(createHttpError(404, 'Page not found'));
//   return;
// }

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  // if (contact.userId.toString() !== req.user._id.toString()) {
  //   next(createHttpError(404, 'Contact not found'));
  //   return;
  // }

  res.json({
    status: res.statusCode,
    message: `Successfully found a contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const userId = req.user._id;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber) {
    throw createHttpError(400, 'Name and phone number are required fields.');
  }

  const contact = await addContact(userId, {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const result = await patchContact(userId, contactId, {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact',
    data: result.contact,
  });
};
export const deleteContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).end();
};
