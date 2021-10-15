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
  DB_USR: process.env.DB_USR,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  TEST_DB_NAME: process.env.TEST_DB_NAME,
});
