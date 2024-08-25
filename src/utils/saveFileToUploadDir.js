import path from 'node:path';
import fs from 'node:fs/promises';
import { env } from './env';
import { TEMP_UPLOAD_DIR } from './../constants/index';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};
