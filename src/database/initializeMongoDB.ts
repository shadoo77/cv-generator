import mongoose, { ConnectOptions } from 'mongoose';
import { Logger } from '../logger';
import ENV from '../utils/config';

/**
  * Method to create the DB uri from the environment variables.
  */
const getDBUri = async () => {
  let credentials = '';
  const usr = encodeURIComponent(ENV.DB_USER || '');
  const pwd = encodeURIComponent(ENV.DB_PASSWORD || '');
  const dbName = encodeURIComponent(ENV.DB_NAME || '');
  if (usr && usr.length && pwd && pwd.length) {
    credentials = `${usr}:${pwd}@`;
  } else if (usr && usr.length) {
    credentials = `${usr}@`;
  }
  return `mongodb+srv://${credentials}cluster0.xeevn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
};

export default async () => {
  Logger.debug(`You are using env.ENV_TYPE: ${ENV.ENV_TYPE}`);
  Logger.debug(`You are using env.DB_USR: ${ENV.DB_USER}`);

  try {
    const uri = await getDBUri();
    const connectOption: ConnectOptions = { keepAlive: true, keepAliveInitialDelay: 300000 };
    await mongoose.connect(uri, connectOption);
    Logger.debug(`Mongo DB for ${ENV.ENV_TYPE} environment is successfully connected`);
    return await Promise.resolve();
  } catch (err) {
    Logger.error('Unexpected error connecting to MongoDB', err);
    return Promise.reject(err);
  }
};
