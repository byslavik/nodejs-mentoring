import { NextFunction, Request, Response } from 'express';
import * as methods from './user.controller';
jest.mock('../../services/user/user.service');
import * as service from '../../services/user/user.service';
const reqMock = ({
  params: {
    id: 0,
  },
} as unknown) as Request;
const resMock = ({
  json: jest.fn(),
} as any) as Response;
const nextMock: NextFunction = jest.fn();

describe('User controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call get user service and res.json', async () => {
    const spy = jest.spyOn(service, 'getUser');
    await methods.getUserMethod(reqMock, resMock);
    expect(spy).toBeCalledWith(reqMock.params.id);
    expect(resMock.json).toBeCalled();
  });

  describe('updateUser', () => {
    it('should call update user service and res.json', async () => {
      const spy = jest.spyOn(service, 'updateUser');
      await methods.updateUserMethod(reqMock, resMock, nextMock);
      expect(spy).toBeCalled();
      expect(resMock.json).toBeCalled();
    });
    it('should throw an error and call next', async () => {
      const spy = jest.spyOn(service, 'updateUser').mockImplementation(() => {
        throw new Error('');
      });
      await methods.updateUserMethod(reqMock, resMock, nextMock);
      expect(spy).toBeCalled();
      expect(resMock.json).not.toBeCalled();
      expect(nextMock).toBeCalled();
    });
  });

  it('should call delete user service and res.json', async () => {
    const spy = jest.spyOn(service, 'deleteUser');
    await methods.deleteUserMethod(reqMock, resMock);
    expect(spy).toBeCalledWith(reqMock.params.id);
    expect(resMock.json).toBeCalled();
  });
  describe('createUser', () => {
    it('should call create user service and res.json', async () => {
      const spy = jest.spyOn(service, 'createUser');
      await methods.createUserMethod(reqMock, resMock, nextMock);
      expect(spy).toBeCalled();
      expect(resMock.json).toBeCalled();
    });

    it('should throw an error and call next', async () => {
      const spy = jest.spyOn(service, 'createUser').mockImplementation(() => {
        throw new Error('');
      });
      await methods.createUserMethod(reqMock, resMock, nextMock);
      expect(spy).toBeCalled();
      expect(resMock.json).not.toBeCalled();
      expect(nextMock).toBeCalled();
    });
  });
});
