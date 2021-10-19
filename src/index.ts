import app from './app';
import { initializeMongoDB } from './database';
import { Logger } from './logger';

initializeMongoDB()
  .then(() => {
    const server = {
      host: 'http://localhost',
      port: 3123,
    };

    const port = process.env.PORT || server.port;
    app.listen(port, () => {
      Logger.verbose(`Listening on ${server.host}:${port} ..`);
    });
  })
  .catch((err) => {
    Logger.error('Unexpected error during launching the app', err);
    Promise.reject(err);
  });
