import { REFRESH_TIME } from '../constants/index.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../services/auth.js';

async function registerController(req, res) {
  const registeredUser = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data: {
      name: registeredUser.name,
      email: registeredUser.email,
      id: registeredUser._id,
      createdAt: registeredUser.createdAt,
      updatedAt: registeredUser.updatedAt,
    },
  });
}

async function loginController(req, res) {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TIME),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TIME),
  });
  res.json({
    status: 200,
    message: 'Successfully logged in a user',
    data: {
      accessToken: session.accessToken,
    },
  });
}

async function logoutController(req, res) {
  if (req.cookies.sessionId === 'string') {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).send();
}

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TIME),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TIME),
  });
};

async function refreshSessionController(req, res) {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully refreshed a session',
    data: {
      accessToken: session.accessToken,
    },
  });
}
export {
  registerController,
  loginController,
  logoutController,
  refreshSessionController,
};
