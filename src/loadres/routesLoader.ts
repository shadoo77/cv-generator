import { Application } from 'express';

import home from '../routes/home';
import templates from '../routes/templates';

export default (app: Application) => {
  app.use('/home', home);
  app.use('/templates', templates);

  return app;
};
