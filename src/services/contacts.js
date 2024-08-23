import ContactCollection from '../db/models/contact.js';
import { calculatePaginationData } from './../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
// import mongoose from 'mongoose';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactCollection.find();

    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite !== undefined) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    contactsQuery.where('userId').equals(userId);

    const [contactsCount, contacts] = await Promise.all([
      ContactCollection.find().merge(contactsQuery).countDocuments(),
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

// export const getContactById = async ({ contactId, userId }) => {
//   if (!mongoose.Types.ObjectId.isValid(contactId)) {
//     console.log('Student with this ID does not exist!' );
//     return null;
//   }
//   const contact = await ContactCollection.findOne({ _id: contactId, userId });
//   return contact;
// };

export const getContactById = async ({ contactId, userId }) => {
  const contact = await ContactCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const addContact = async ({ payload, userId, photo }) => {
  const contact = await ContactCollection.create({
    ...payload,
    userId,
    photo,
  });
  return contact;
};

export const patchContact = async ({
  contactId,
  payload,
  userId,
  photo,
  options = {},
}) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { ...payload, photo },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async ({ contactId, userId }) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
