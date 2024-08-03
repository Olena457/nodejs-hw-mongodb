import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  patchContact,
} from './../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found  contacts',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found a contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber) {
    res.status(400).json({
      status: 400,
      message: 'Name and phone number are required fields.',
    });
    return;
  }

  const contact = await addContact({
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
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const result = await patchContact(contactId, {
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

  res.json({
    status: 200,
    message: 'Successfully patched a contact',
    data: result,
  });
};
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.sendStatus(204);
};
