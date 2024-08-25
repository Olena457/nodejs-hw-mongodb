import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs/promises';
import handlebars from 'handlebars';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import {
  ACCESS_TIME,
  APP_DOMAIN,
  JWT_SECRET,
  REFRESH_TIME,
  EMAIL_VARS,
  TEMPLATES_DIR,
} from './../constants/index.js';

import UserCollection from './../db/models/users.js';
import SessionsCollections from './../db/models/session.js';
import { sendEmail } from './../utils/sendEmail.js';

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');
  const encrypterdPassword = await bcrypt.hash(payload.password, 10);

  return await UserCollection.create({
    ...payload,
    password: encrypterdPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
  await SessionsCollections.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollections.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TIME),
  });
};

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
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  console.log('Check session:', { sessionId, refreshToken });
  const session = await SessionsCollections.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  const newSession = createSession();
  await SessionsCollections.deleteOne({ _id: sessionId, refreshToken });
  return await SessionsCollections.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollections.deleteOne({ _id: sessionId });
};

export const sendResetEmail = async (email) => {
  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    env(JWT_SECRET),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'send-reset-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${env(APP_DOMAIN)}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: env(EMAIL_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch {
    throw createHttpError(
      500,

      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env(JWT_SECRET));
  } catch (err) {
    if (err instanceof Error) {
      throw createHttpError(
        401,

        'Token is expired or invalid.',
      );
    }
    throw err;
  }

  const user = await UserCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UserCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );

  await SessionsCollections.deleteOne({ userId: user._id });
};
