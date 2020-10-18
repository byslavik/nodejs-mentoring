import dotenv from 'dotenv';
dotenv.config();

import sequelize from './db';
import app from './app';
import { logger } from './logger';

(async () => {
  await sequelize.sync();

  app.listen(8080, () => {
    console.log('server is ready');
  });

  process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
  });
  process.on('unhandledRejection', (err) => {
    logger.error(err);
  });
})();
