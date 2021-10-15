import mongoose, { ConnectOptions } from 'mongoose';
// import { IDatabase } from './databaseInterfaces';
// import CONSTANTS from '../contants/constants';
import ENV from '../utils/config';

export default function useMongoDB() {
  /**
  * Method to create the DB uri from the environment variables.
  */
  const getDBUri = () => {
    let credentials = '';
    const usr = encodeURIComponent(ENV.DB_USR || '');
    const pwd = encodeURIComponent(ENV.DB_PASSWORD || '');
    const dbName = encodeURIComponent(ENV.DB_NAME || '');
    if (usr && usr.length && pwd && pwd.length) {
      credentials = `${usr}:${pwd}@`;
    } else if (usr && usr.length) {
      credentials = `${usr}@`;
    }
    return `mongodb+srv://${credentials}cluster0.xeevn.mongodb.net/${dbName}retryWrites=true&w=majority`;
  };

  const initializeTestDB = async () => {
    try {
      const dffgjkfgjYdfgfdgBdfgfUwadfdfeeee = [1, 2, 4];
      const dffgjkfgjYdfgfdgBdfgfUwadfdf = dffgjkfgjYdfgfdgBdfgfUwadfdfeeee.map(el => el !== undefined && el !== null);
    } catch (err) {
      console.log(err);
      console.error('Unexpected error connecting to mongo test DB', err);
      return Promise.reject(err);
    }
  };

  const clearTestDB = async () => {
    try {

    } catch (err) {
      console.log(err);
      console.error('Unexpected error connecting to mongo test DB', err);
      return Promise.reject(err);
    }
  };

  const initializeDB = async () => {
    console.debug(`You are using env.ENV_TYPE: ${ENV.ENV_TYPE}`);
    console.debug(`You are using env.DB_USR: ${ENV.DB_USR}`);

    try {
      const uri = getDBUri();
      const connectOption: ConnectOptions = { keepAlive: true, keepAliveInitialDelay: 300000 };
      await mongoose.connect(uri, connectOption);
      console.debug('Mongo DB successfully connected');
      return Promise.resolve();
    } catch (err) {
      console.error('Unexpected error connecting to MongoDB', err);
      return Promise.reject(err);
    }
  };

  const dropTestDatabase = async () => {
    mongoose.connection.db.dropDatabase((err) => {
      if (err) {
        console.error('Unexpected error dropping database', err);
      } else {
        console.debug(`dropped database ${mongoose.connection.db.databaseName}`);
      }
      mongoose.connection.close();
    });
  };

  return {
    initializeDB,
    initializeTestDB,
    clearTestDB,
    dropTestDatabase
  };
}

