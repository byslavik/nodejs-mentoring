import { where, fn, col } from 'sequelize';

import { UserSchema } from '../../types';
import { User as UserModel } from '../../models';

export const getUser = (id: string) => {
  return UserModel.findOne({
    where: {
      id,
    },
  });
};

export const createUser = (user: UserSchema) => {
  return UserModel.create(user);
};

export const updateUser = (id: string, userData: UserSchema) => {
  return UserModel.update(userData, { where: { id }, returning: true }).then(
    (result: [number, UserSchema[]]) => result?.[1]?.[0] ?? null
  );
};

export const deleteUser = (id: string) => {
  return UserModel.destroy({ where: { id } });
};

export const searchUsers = ({ query, limit }: { query: string; limit: number }) => {
  return UserModel.findAndCountAll({
    where: {
      login: where(fn('LOWER', col('login')), 'LIKE', `%${query.toLowerCase()}%`),
    },
    order: [['login', 'ASC']],
    limit,
  });
};
