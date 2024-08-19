import { isValidObjectId } from 'mongoose';
import HttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `'${contactId}' is not a valid id`));
  }
  next();
};

export default isValidId;
