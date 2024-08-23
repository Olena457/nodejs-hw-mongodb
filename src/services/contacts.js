import ContactCollection from '../db/models/contact.js';
import { calculatePaginationData } from './../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

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
export const getContactById = async (contactId, userId) => {
  const contact = await ContactCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const addContact = async (payload, userId) => {
  const contact = await ContactCollection.create({
    ...payload,
    userId,
  });
  return contact;
};

export const patchContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
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

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

// import mongoose from 'mongoose';

// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
//   userId,
// }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;
//   const contactsQuery = ContactsCollection.find();

//   if (filter.type) {
//     contactsQuery.where('contactType').equals(filter.type);
//   }
//   if (filter.isFavourite) {
//     contactsQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   contactsQuery.where('userId').equals(userId);

//   const [contactsCount, contacts] = await Promise.all([
//     ContactsCollection.find().merge(contactsQuery).countDocuments(),
//     contactsQuery
//       .skip(skip)
//       .limit(limit)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//   ]);

//   const paginationData = calculatePaginationData(contactsCount, perPage, page);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getContactById = async ({ contactId, userId }) => {
//   if (!mongoose.Types.ObjectId.isValid(contactId)) {
//     console.log(
//       '\x1b[41m%s\x1b[0m',
//       '\nStudent with this ID does not exist!\n',
//     );
//     return null;
//   }
//   const contact = await ContactsCollection.findOne({ _id: contactId, userId });

//   return contact;
// };

// export const addContact = async ({ payload, userId }) => {
//   const contact = await ContactsCollection.create({ ...payload, userId });
//   return contact;
// };

// export const patchContact = async ({ contactId, contact, userId }) => {
//   const result = ContactsCollection.findOneAndUpdate(
//     { _id: contactId, userId },
//     contact,
//     {
//       new: true,
//     },
//   );
//   return result;
// };

// export const deleteContact = async ({ contactId, userId }) => {
//   const result = ContactsCollection.findOneAndDelete({
//     _id: contactId,
//     userId,
//   });
//   return result;
// };
