import { User } from '../models';

export interface UserSchema {
  login: string;
  password: string;
  age: number;
}

export type UserList = Record<string, User>;
