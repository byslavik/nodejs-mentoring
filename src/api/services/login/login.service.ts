import { JWT } from 'jose';

import { User as UserModel } from '../../models';
import { LoginSchema } from '../../types';
import { logger } from '../../logger';

const TOKEN_DESCRIPTOR = 'JWT';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'my_secret';

export const validateUser = (userData: LoginSchema) => {
  return UserModel.findOne({
    where: { ...userData },
  });
};

export const getToken = (userId: UserModel['id']) => {
  const token = JWT.sign({ userId }, SECRET_KEY, {
    expiresIn: '60s',
  });
  return [TOKEN_DESCRIPTOR, token].join(' ');
};

export const validateToken = (token: string) => {
  const [descriptor, tokenValue] = token.split(' ');

  if (descriptor !== TOKEN_DESCRIPTOR) {
    return false;
  }

  try {
    const decryptedUser = JWT.verify(tokenValue, SECRET_KEY);

    return decryptedUser;
  } catch (err) {
    logger.error(err);
    return false;
  }
};
