import { Sequelize } from 'sequelize-typescript';

import * as models from '../models';

const sequelize = new Sequelize(
  'postgres://zlqiypww:wXWnsdCvgOtCMJ5HAuu2K53RoFngWE0D@balarama.db.elephantsql.com:5432/zlqiypww'
);

sequelize.addModels(Object.values(models));

export default sequelize;
