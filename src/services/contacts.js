import { ContactsCollection } from '../db/models/contact.js';

export async function getAllContacts() {
  return await ContactsCollection.find();
}

export async function getContactById(contactId) {
  return await ContactsCollection.findOne({ _id: contactId });
}

export async function addContact(payload) {
  return await ContactsCollection.create(payload);
}

export async function patchContact(contactId, payload) {
  const result = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
    },
  );
  return result;
}

export async function deleteContact(contactId) {
  const result = await ContactsCollection.findByIdAndDelete(contactId);
  return result;
}
