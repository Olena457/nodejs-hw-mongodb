import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue != undefined) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
// import dotenv from 'dotenv';
// dotenv.config();

// export const env = (name, defaultValue) => {
//   const value = process.env[name];
//   if (value) return value;
//   if (defaultValue) return defaultValue;
//   throw new Error(`${name} variable doesn't exist`);
// };
