import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { ACCESS_TIME, REFRESH_TIME } from './../constants/index.js';
import { UserCollection } from './../db/models/users.js';
import { SessionsCollections } from './../db/models/session.js';

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email already in use');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return UserCollection.create({ ...payload, password: encryptedPassword });
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollections.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollections.create({
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TIME),
  });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollections.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired)
    throw createHttpError(401, 'Session token expired');

  const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    return {
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + ACCESS_TIME),
      refreshTokenValidUntil: new Date(Date.now() + REFRESH_TIME),
    };
  };

  await SessionsCollections.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollections.create({
    userId: session.userId,
    ...createSession(),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollections.deleteOne({ _id: sessionId });
};
