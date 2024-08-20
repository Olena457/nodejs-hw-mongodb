import { ACCESS_TIME } from '../constants/index.js';
import createHttpError from 'http-errors';

import { UserCollection } from '../db/models/users.js';
import { SessionsCollections } from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be type of Bearer'));
    return;
  }

  const session = await SessionsCollections.findOne({ accessToken: token });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  session.accessTokenValidUntil = new Date(Date.now() + ACCESS_TIME);
  await session.save();

  const user = await UserCollection.findById(session.userId);
  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }
  req.user = user;

  next();
};
