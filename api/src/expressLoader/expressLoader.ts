import express from 'express';
import cors from 'cors';
import path from 'path';
import { MongoDB } from '../database';
import RoutesLoader from '../loadres/routesLoader';
import { Logger } from '../logger';
import constants from '../contants/constants';

export default async (app: express.Application) => {
  try {
    app.use(cors());

    app.use(express.urlencoded({
      extended: false,
      limit: '50mb',
      parameterLimit: 1000000,
    }));
    app.use(express.json());

    // access for anywhere on the server
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token',
      );
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
      }
      return next();
    });

    // Initial database
    await MongoDB.initializeDB();

    // load routes
    RoutesLoader(app);

    // Server static assets if in production
    if (process.env.NODE_ENV === 'production') {
      // Set static folder
      app.use(express.static(path.join(__dirname, 'client/build')));
      app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/client/build/index.html`)));
    }

    app.use((req, res, next) => {
      const error: any = new Error('inserted request is not found!');
      error.status = 404;
      return next(error);
    });

    app.use((error: any, req: any, res: any) => {
      res.status(error.status || 500).json({ Error: error.message });
    });
  } catch (err) {
    Logger.error('Unexpected error in express loader', err);
  }

  // error handler. Keep this outside of try/catch block so that an error code is sent
  app.use((err: any, req: any, res: any, next: any) => {
    Logger.error('Unexpected error: ', err ? `${err.status}: ${err.message}` : 'unknown error');

    // render the error page or let Express handle the error if the response was already sent to the client
    if (res.headersSent) {
      return next(err);
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' || req.app.get('env') === constants.LOCALHOST ? err : {};
    res.status(err.status || 500);
    return res.sendStatus(err.status);
  });
};
