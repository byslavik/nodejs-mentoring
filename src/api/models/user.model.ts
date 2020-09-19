import {
  Table,
  Column,
  Model,
  Unique,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Group } from './group.model';
import { UserGroup } from './userGroup.model';

@Table
class User extends Model<User> {
  @BelongsToMany(() => Group, {
    through: () => UserGroup,
    as: 'group',
    foreignKey: 'userId',
  })
  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @Unique
  @Column
  login: string;

  @Column
  password: string;

  @Column
  age: number;
}

export { User };
