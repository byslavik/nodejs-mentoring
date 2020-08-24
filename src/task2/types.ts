export type UserSchema = {
  login: string;
  password: string;
  age: number;
};

export type User = UserSchema & {
  id: string;
  isDeleted: boolean;
};

export type UserList = {
  [key: string]: User;
};
