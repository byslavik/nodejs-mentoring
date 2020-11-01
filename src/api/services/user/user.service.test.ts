jest.mock('../../db', () => jest.fn());
jest.mock('../../models/user.model');

import * as service from './user.service';
import { User } from '../../models/user.model';

const userMock = {
  login: '0',
} as User;

describe('User service', () => {
  it('Should find user by id', async () => {
    const spy = jest.spyOn(User, 'findOne');
    await service.getUser('0');
    expect(spy).toBeCalledWith({
      where: {
        id: '0',
      },
    });
  });
  it('Should create user', async () => {
    const spy = jest.spyOn(User, 'create');
    await service.createUser(userMock);
    expect(spy).toBeCalledWith(userMock);
  });
  it('Should update user', async () => {
    const spy = jest.spyOn(User, 'update');
    await service.updateUser('0', userMock);
    expect(spy).toBeCalledWith(userMock, { where: { id: '0' }, returning: true });
  });
  it('Should delete user', async () => {
    const spy = jest.spyOn(User, 'destroy');
    await service.deleteUser('0');
    expect(spy).toBeCalledWith({ where: { id: '0' } });
  });
  it('Should search users', async () => {
    const spy = jest.spyOn(User, 'findAndCountAll');
    const searchMock = { query: 'john', limit: 10 };
    await service.searchUsers(searchMock);
    expect(spy).toBeCalledWith({
      limit: 10,
      order: [['login', 'ASC']],
      where: {
        login: {
          attribute: {
            args: [
              {
                col: 'login',
              },
            ],
            fn: 'LOWER',
          },
          comparator: 'LIKE',
          logic: '%john%',
        },
      },
    });
  });
});
