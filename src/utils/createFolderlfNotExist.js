import fs from 'fs/promises';

const crateFolderIfNotExist = async (path) => {
  try {
    await fs.access(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path);
    }
  }
};
export default crateFolderIfNotExist;
