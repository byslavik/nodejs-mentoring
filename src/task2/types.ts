export interface UserSchema {
  login: string;
  password: string;
  age: number;
}

export interface User extends UserSchema {
  id: string;
  isDeleted: boolean;
}

export type UserList = Record<string, User>;
