import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const ENV_TYPE = process.env.NODE_ENV;
const newPath = path.resolve(
  process.cwd(),
  ENV_TYPE ? `.env.${ENV_TYPE}` : '.env',
);
dotenv.config({ path: newPath });

export default Object.freeze({
  ENV_TYPE,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USER: process.env.DB_USER,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  TEST_DB_NAME: process.env.TEST_DB_NAME,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  API_BASE_URL: process.env.API_BASE_URL,
  WEB_BASE_URL: process.env.WEB_BASE_URL,
});
