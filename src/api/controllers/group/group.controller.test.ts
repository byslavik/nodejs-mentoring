import { NextFunction, Request, Response } from 'express';
import * as methods from './group.controller';
jest.mock('../../services/group/group.service');
import * as service from '../../services/group/group.service';
import { ValidatedRequest } from 'express-joi-validation';
import { AddUsersToGroupRequestSchema } from '../../services/group/group.validators';
const reqMock = ({
  params: {
    id: 0,
  },
} as unknown) as Request;
const resMock = ({
  json: jest.fn(),
} as any) as Response;
const nextMock: NextFunction = jest.fn();

describe('Group controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call get group service and res.json', async () => {
    const spy = jest.spyOn(service, 'getGroup');
    await methods.getGroupMethod(reqMock, resMock);
    expect(spy).toBeCalledWith(reqMock.params.id);
    expect(resMock.json).toBeCalled();
  });

  describe('updateGroup', () => {
    it('should call update user service and res.json', async () => {
      const spy = jest.spyOn(service, 'updateGroup');
      await methods.updateGroupMethod(reqMock, resMock, nextMock);
      expect(spy).toBeCalled();
      expect(resMock.json).toBeCalled();
    });
    it('should throw an error and call next', async () => {
      const spy = jest.spyOn(service, 'updateGroup').mockImplementation(() => {
        throw new Error('');
      });
      await methods.updateGroupMethod(reqMock, resMock, nextMock);
      expect(spy).toBeCalled();
      expect(resMock.json).not.toBeCalled();
      expect(nextMock).toBeCalled();
    });
  });

  it('should call delete group service and res.json', async () => {
    const spy = jest.spyOn(service, 'deleteGroup');
    await methods.deleteGroupMethod(reqMock, resMock);
    expect(spy).toBeCalledWith(reqMock.params.id);
    expect(resMock.json).toBeCalled();
  });
  describe('createGroup', () => {
    it('should call create group service and res.json', async () => {
      const spy = jest.spyOn(service, 'createGroup');
      await methods.createGroupMethod(reqMock, resMock, nextMock);
      expect(spy).toBeCalled();
      expect(resMock.json).toBeCalled();
    });

    it('should throw an error and call next', async () => {
      const spy = jest.spyOn(service, 'createGroup').mockImplementation(() => {
        throw new Error('');
      });
      await methods.createGroupMethod(reqMock, resMock, nextMock);
      expect(spy).toBeCalled();
      expect(resMock.json).not.toBeCalled();
      expect(nextMock).toBeCalled();
    });
  });
  it('Should properly execute getAllGroupsMethod', async () => {
    const spy = jest.spyOn(service, 'getAllGroups');
    await methods.getAllGroupsMethod(reqMock, resMock, nextMock);
    expect(spy).toBeCalled();
    expect(resMock.json).toBeCalled();
  });
  it('Should link user and group with addUserToGroupMethod', async () => {
    const spy = jest.spyOn(service, 'addUsersToGroup');
    const bodyMock = { groupId: '0', userIds: ['0'] };
    await methods.addUserToGroupMethod(
      { ...reqMock, body: bodyMock } as ValidatedRequest<AddUsersToGroupRequestSchema>,
      resMock,
      nextMock
    );
    expect(spy).toBeCalledWith(bodyMock.groupId, bodyMock.userIds);
    expect(resMock.json).toBeCalled();
  });
});
