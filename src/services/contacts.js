import mongoose from 'mongoose';
import { ContactsCollection } from './../models/contact.js';

export const getAllContacts = async () => {
  const contact = ContactsCollection.find();
  return contact;
};

export const getContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    console.log('\nContact with this ID does not exist!\n');
    return null;
  }

  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
