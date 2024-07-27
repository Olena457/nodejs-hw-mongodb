import mongoose from 'mongoose';
import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    console.log('\nContact with this ID does not exist!\n');
    return null;
  }

  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
