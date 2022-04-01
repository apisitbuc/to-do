import * as users from '../utils/user.json';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  approve: boolean;
}

export interface IUserRepository {
  findAll(): IUser[];
}

export class UserRepository implements IUserRepository {
  findAll(): IUser[] {
    return users;
  }
}

export const userRepository = new UserRepository();
