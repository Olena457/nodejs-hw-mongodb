import { SORT_ORDER } from '../db/constants/index.js';
import mongoose from 'mongoose';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from './../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    console.log('Contact with this ID does not exist');
    return null;
  }
  const contact = await ContactsCollection.findOne({ _id: contactId });
  return contact;
};

export const addContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const patchContact = async (contactId, payload) => {
  const result = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const deleteContact = async (contactId) => {
  const result = await ContactsCollection.findByIdAndDelete(contactId);
  return result;
};
