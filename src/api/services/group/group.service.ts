import { Group, UserGroup, User } from '../../models';
import sequelize from '../../db';

export const getGroup = (id: string) => {
  return Group.findOne({
    where: {
      id,
    },
  });
};

export const createGroup = (group: Group) => {
  return Group.create(group);
};

export const updateGroup = (id: string, groupData: Group) => {
  return Group.update(groupData, { where: { id }, returning: true }).then(
    (result: [number, Group[]]) => result?.[1]?.[0] ?? null
  );
};

export const deleteGroup = (id: string) => {
  return Group.destroy({ where: { id } });
};

export const getAllGroups = () => {
  return Group.findAll();
};

export const addUsersToGroup = async (groupId: string, userIds: string[]) => {
  const group: Group = await Group.findOne({ where: { id: groupId } });
  const users = await User.findAndCountAll({ where: { id: userIds } });

  if (group && users.count) {
    await sequelize.transaction(async (t) => {
      users.rows.map(
        async (user: User) => await group.$add('user', user, { transaction: t })
      );
    });

    return true;
  }

  throw new Error('There are no users or groups with such ids');
};
