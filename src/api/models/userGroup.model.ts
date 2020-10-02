import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Group } from './group.model';
import { User } from './user.model';

@Table
class UserGroup extends Model<UserGroup> {
  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ForeignKey(() => Group)
  @Column
  groupId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.ARRAY(DataTypes.UUID),
  })
  userId: string[];
}

export { UserGroup };
