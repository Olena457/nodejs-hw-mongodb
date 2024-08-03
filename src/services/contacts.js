import mongoose from 'mongoose';
import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    console.log('Contact with this ID does not exist!');
    return null;
  }

  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
export const addContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};
export const patchContact = async (contactId, payload) => {
  const result = ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
  });
  return result;
};
export const deleteContact = async (contactId) => {
  const result = ContactsCollection.findByIdAndDelete(contactId);
  return result;
};
