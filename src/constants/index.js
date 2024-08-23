import path from 'path';
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const PHONE_REGEX = /^\+?[0-9]{10,15}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ACCESS_TIME = 15 * 60 * 60 * 1000;
export const REFRESH_TIME = 30 * 24 * 60 * 60 * 1000;

export const JWT_SECRET = 'JWT_SECRET';

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const APP_DOMAIN = 'APP_DOMAIN';

export const EMAIL_VARS = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASS: 'SMTP_PASS',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};
