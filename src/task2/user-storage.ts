import { UserList, User, UserSchema } from './types';
import { mockUsers } from './mocks';

export class UserStorage {
  private users: UserList = {};

  constructor(initialUsers: UserList) {
    this.users = initialUsers;
  }

  isUserExists(id: User['id']): boolean {
    return Boolean(this.users[id]) && !this.users[id].isDeleted;
  }

  isLoginFree(login: User['login']): boolean {
    const usersByLogin = Object.values(this.users).filter(
      (user) => !user.isDeleted && user.login.toLowerCase() === login.toLowerCase()
    );
    return usersByLogin.length === 0;
  }

  create(user: User) {
    this.users[user.id] = { ...user, isDeleted: false };

    return this.users[user.id];
  }

  update(id: User['id'], user: UserSchema) {
    this.users[id] = { ...this.users[id], ...user };

    return this.users[id];
  }

  remove(id: User['id']) {
    if (!this.isUserExists(id)) {
      return null;
    }
    this.users[id].isDeleted = true;

    return true;
  }

  getUser(id: User['id']) {
    if (!this.isUserExists(id)) {
      return null;
    }
    return this.users[id];
  }

  getSuggestions(search: string, limit: number) {
    return Object.values(this.users)
      .filter(
        (user) =>
          !user.isDeleted && user.login.toLowerCase().startsWith(search.toLowerCase())
      )
      .sort((a, b) => (a.login > b.login ? 1 : -1))
      .slice(0, limit);
  }
}

export const userStorage = new UserStorage(mockUsers);
