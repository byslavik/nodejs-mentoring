const sequelizeMock = {
  transaction: jest.fn(),
};

jest.mock('../../db', () => sequelizeMock);
jest.mock('../../models/group.model');
jest.mock('../../models/user.model');

import * as service from './group.service';
import { Group } from '../../models/group.model';
import { User } from '../../models/user.model';

const groupMock = {
  name: 'name',
} as Group;

describe('Group service', () => {
  it('Should find group by id', async () => {
    const spy = jest.spyOn(Group, 'findOne');
    await service.getGroup('0');
    expect(spy).toBeCalledWith({
      where: {
        id: '0',
      },
    });
  });
  it('Should create group', async () => {
    const spy = jest.spyOn(Group, 'create');
    await service.createGroup(groupMock);
    expect(spy).toBeCalledWith(groupMock);
  });
  it('Should update group', async () => {
    const spy = jest.spyOn(Group, 'update');
    await service.updateGroup('0', groupMock);
    expect(spy).toBeCalledWith(groupMock, { where: { id: '0' }, returning: true });
  });
  it('Should delete group', async () => {
    const spy = jest.spyOn(Group, 'destroy');
    await service.deleteGroup('0');
    expect(spy).toBeCalledWith({ where: { id: '0' } });
  });
  it('Should call for all groups', async () => {
    const spy = jest.spyOn(Group, 'findAll');
    await service.getAllGroups();
    expect(spy).toBeCalled();
  });
  describe('addUsersToGroup', () => {
    it('Should assign users to groups', async () => {
      const spyGroup = jest.spyOn(Group, 'findOne').mockReturnValue({ id: '0' });
      const spyUser = jest
        .spyOn(User, 'findAndCountAll')
        .mockReturnValue({ rows: [{ id: '0' }, { id: '1' }], count: 2 });
      await service.addUsersToGroup('0', ['0', '1']);
      expect(spyGroup).toBeCalledWith({ where: { id: '0' } });
      expect(spyUser).toBeCalledWith({ where: { id: ['0', '1'] } });
      expect(sequelizeMock.transaction).toBeCalled();
    });

    it('Should throw an error if no groups or users', async () => {
      const spyGroup = jest.spyOn(Group, 'findOne').mockReturnValue({});
      const spyUser = jest
        .spyOn(User, 'findAndCountAll')
        .mockReturnValue({ rows: [], count: 0 });
      try {
        await service.addUsersToGroup('0', ['0', '1']);
        expect(spyGroup).toBeCalledWith({ where: { id: '0' } });
        expect(spyUser).toBeCalledWith({ where: { id: ['0', '1'] } });
      } catch (e) {
        expect(e.message).toBe('There are no users or groups with such ids');
      }
    });
  });
});
