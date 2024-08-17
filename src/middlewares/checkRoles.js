import createHttpError from 'http-errors';
import { ROLES } from '../constants/index.js';
import { ContactsCollection } from './../db/models/contact';

export const checkRoles = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return next(createHttpError(401, 'You do not have access to the resource'));
  }

  const { role } = user;
  if (role === ROLES.AUTHOR) {
    const { contactId } = req.params;
    if (!contactId) {
      return next(createHttpError(403, 'Forbidden access'));
    }

    const contact = await ContactsCollection.findOne({
      _id: contactId,
      userId: user._id,
    });

    if (contact) {
      next();
      return;
    }
  }

  next(createHttpError(403, 'Forbidden access'));
};
