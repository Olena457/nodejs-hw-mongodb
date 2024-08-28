import nodemailer from 'nodemailer';
import { EMAIL_VARS } from './../constants/index.js';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env(EMAIL_VARS.SMTP_HOST),
  port: Number(env(EMAIL_VARS.SMTP_PORT)),
  // port: env(EMAIL_VARS.SMTP_PORT),

  auth: {
    user: env(EMAIL_VARS.SMTP_USER),
    pass: env(EMAIL_VARS.SMTP_PASS),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
