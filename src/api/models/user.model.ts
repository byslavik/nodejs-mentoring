import { Table, Column, Model, Unique } from 'sequelize-typescript';

@Table
class User extends Model<User> {
  @Unique
  @Column
  login: string;

  @Column
  password: string;

  @Column
  age: number;
}

export { User };
