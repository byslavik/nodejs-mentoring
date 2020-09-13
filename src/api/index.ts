import dotenv from 'dotenv';
dotenv.config();

import sequelize from './db';
import app from './app';

(async () => {
  await sequelize.sync();

  app.listen(8080, () => {
    console.log('server is ready');
  });
})();
