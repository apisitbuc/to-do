// import * as users from '../utils/user.json';

let users: IUser[] = [
  {
    userId: 1,
    firstname: 'a',
    lastname: 'b',
    approve: false,
    username: 'user-a',
    password: 'pass-a',
    isLogin: false,
  },
];

export interface IUser {
  userId: number;
  firstname: string;
  lastname: string;
  approve: boolean;
  username: string;
  password: string;
  isLogin: boolean;
}

export interface IUserRepository {
  findAll(): IUser[];
  create(user: IUser): IUser[];
}

export class UserRepository implements IUserRepository {
  findAll(): IUser[] {
    return users;
  }

  create(user: IUser): IUser[] {
    users.push(user);
    return users;
  }

  findByUsername(username: string) {
    return users.find((user) => user.username === username);
  }

  findByUserId(userId: number) {
    return users.find((user) => user.userId === userId);
  }

  updateUser(payload: IUser[]) {
    users = payload;
    return users;
  }
}

export const userRepository = new UserRepository();
