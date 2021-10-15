import { Application } from 'express';

import home from '../routes/home';

export default (app: Application) => {
  app.use('/', home);

  return app;
};
