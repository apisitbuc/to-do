import { Service } from 'typedi';
import { NotFound, ValidateError } from '../../errors/errors';
import { UserRepository } from '../../repositories/user.repository';
import { ILogin, IUserSignUp } from './interface';

@Service()
export class UserDomain {
  constructor(private userRepo: UserRepository) {}

  private genarateId() {
    return Math.floor(Math.random() * 101);
  }

  private validateUser(userId: number) {
    const user = this.userRepo.findByUserId(userId);

    if (!user) {
      throw new NotFound(`userId ${userId} not found`);
    }

    if (user?.approve) {
      throw new ValidateError(`User is already approve.`);
    }
  }

  private validateLogin(username: string, password: string) {
    const user = this.userRepo.findByUsername(username);
    if (!user) {
      throw new NotFound(`username ${username} not found`);
    }

    if (user.password !== password) {
      throw new ValidateError(`username ${username} incorrect password`);
    }

    if (!user?.approve) {
      throw new ValidateError(`User is not approve.`);
    }
  }

  private buildSighUpPayload(signUp: IUserSignUp) {
    return {
      ...signUp,
      userId: this.genarateId(),
      approve: false,
      isLogin: false,
    };
  }

  private buildUserPayload(userId: number) {
    const users = this.getAllUser();
    return users.map((user) => {
      if (user.userId === userId) {
        return {
          ...user,
          approve: true,
        };
      }
      return user;
    });
  }

  private buildLoginPayload(username: string) {
    const users = this.getAllUser();
    return users.map((user) => {
      if (user.username === username) {
        return {
          ...user,
          isLogin: true,
        };
      }
      return user;
    });
  }

  private getAllUser() {
    return this.userRepo.findAll();
  }

  findAll() {
    return this.getAllUser();
  }

  createUser(signUp: IUserSignUp) {
    const { username } = signUp;
    try {
      const hasUser = this.userRepo.findByUsername(username);
      if (hasUser) {
        throw new ValidateError(`username ${username} already exists`);
      }
      const payload = this.buildSighUpPayload(signUp);
      return this.userRepo.create(payload);
    } catch (err) {
      return err;
    }
  }

  updateStatusUser(userId: number) {
    try {
      this.validateUser(userId);

      const user = this.buildUserPayload(userId);

      this.userRepo.updateUser(user);

      return 'update success';
    } catch (err) {
      return err;
    }
  }

  login(login: ILogin) {
    const { username, password } = login;
    try {
      this.validateLogin(username, password);
      const payloadLogin = this.buildLoginPayload(username);
      this.userRepo.updateUser(payloadLogin);
      return 'login success';
    } catch (err) {
      return err;
    }
  }
}
