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

export const getAllContactsController = async (req, res) => {
  const userId = req.user._id;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

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

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById({ contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact no found');
  }
  if (contact.userId.toString() !== userId.toString()) {
    return next(createHttpError(403, 'Access denied'));
  }

  res.json({
    status: 200,
    message: `Successfully found a contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const payload = req.body;
  const userId = req.user._id;
  // const payload = { ...req.body, userId };
  const contact = await addContact({ payload, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = req.body;
  const result = await patchContact({ contactId, contact, userId });

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
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await deleteContact({ contactId, userId });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).end();
};
