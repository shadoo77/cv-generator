import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Logger } from '../../logger';
import ENV from '../../utils/config';

export default function testDBFactory() {
  let mongoMemoryServer: MongoMemoryServer;
  // Get test db url
  const getTestDBUri = async () => {
    try {
      Logger.debug('Getting test db uri');
      mongoMemoryServer = await MongoMemoryServer.create();
      return mongoMemoryServer.getUri();
    } catch (err) {
      Logger.error(`You are using env.DB_USR: ${ENV.DB_USER}`);
      return Promise.reject(err);
    }
  };

  const initializeTestDB = async () => {
    Logger.debug(`You are using env.ENV_TYPE: ${ENV.ENV_TYPE}`);
    Logger.debug(`You are using env.DB_USR: ${ENV.DB_USER}`);

    try {
      const uri = await getTestDBUri();
      const connectOption: ConnectOptions = { keepAlive: true, keepAliveInitialDelay: 300000 };
      await mongoose.connect(uri, connectOption);
      Logger.debug(`Mongo DB for ${ENV.ENV_TYPE} environment is successfully connected`);
      return await Promise.resolve();
    } catch (err) {
      Logger.error('Unexpected error connecting to MongoDB', err);
      return Promise.reject(err);
    }
  };

  const clearTestDB = async () => {
    try {
      Logger.debug('Clear test db');
      // const eee = mongoose.connection.collections;
      const collections = await mongoose.connection.db.collections();
      // console.log('mongoose.connection.collections >>>>>>>>>>>> ', eee, collections);
      return await Promise.all(
        collections.map((collection: mongoose.Collection) => collection.drop()),
      );
    } catch (err) {
      Logger.error('Unexpected error connecting to mongo test DB', err);
      return Promise.reject(err);
    }
  };

  const dropTestDB = async () => {
    try {
      Logger.enter('Start dropping test database');
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongoMemoryServer.stop();
      Logger.exit('Exit dropping test database');
    } catch (err) {
      Logger.error('Unexpected error dropTestDatabase', err);
      Promise.reject(err);
    }
  };

  return {
    initializeTestDB,
    clearTestDB,
    dropTestDB,
  };
}
