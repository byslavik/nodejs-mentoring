import { Sequelize } from 'sequelize-typescript';

import * as models from '../models';

const { POSTGRES_DB_LOGIN, POSTGRES_DB_NAME, POSTGRES_DB_PASSWORD } = process.env;

const sequelize = new Sequelize(
  `postgres://${POSTGRES_DB_LOGIN}:${POSTGRES_DB_PASSWORD}@balarama.db.elephantsql.com:5432/${POSTGRES_DB_NAME}`
);

sequelize.addModels(Object.values(models));

export default sequelize;
