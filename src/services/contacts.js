import ContactCollection from '../db/models/contact.js';
import { calculatePaginationData } from './../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
// import mongoose from 'mongoose';

export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    
    const contactsQuery = ContactCollection.find(userId);

    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite !== undefined) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }


    const [contactsCount, contacts] = await Promise.all([
      ContactCollection.find(userId).merge(contactsQuery).countDocuments(),
      contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);
    const paginationData = calculatePaginationData(
      contactsCount,
      perPage,
      page,
    );
    console.log('Contacts:', contacts);
    return { data: contacts, ...paginationData };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};



export const getContactById = async (contactId, userId) => {
  const contact = await ContactCollection.findOne({ _id: contactId, userId });
  return contact;
};


export const addContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};
export const patchContact = async (contactId, userId, payload) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
    },
  );

  return result;
};



export const deleteContact = async (contactId, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
