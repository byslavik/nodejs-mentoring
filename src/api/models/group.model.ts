import { Permission } from './../types';
import { Table, Column, Model, Unique, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './user.model';
import { UserGroup } from './userGroup.model';

@Table
class Group extends Model<Group> {
  @BelongsToMany(() => User, {
    through: () => UserGroup,
    as: 'user',
    foreignKey: 'groupId',
  })
  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @Unique
  @Column
  name: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
  })
  permissions: Permission[];
}

export { Group };
