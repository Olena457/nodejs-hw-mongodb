import { SessionsCollections } from '../db/models/sessions.js';
import { UserCollection } from '../db/models/users.js';
import createHttpError from 'http-errors';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || typeof token !== 'string') {
    return next(createHttpError(401, 'Auth header should be type of Bearer'));
  }

  const session = await SessionsCollections.findOne({ accessToken: token });
  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UserCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401, 'Session not found'));
  }
  req.user = user;

  next();
};
