import { Service } from 'typedi';
import { UserRepository } from '../../repositories/user.repository';

@Service()
export class UserDomain {
  constructor(private userRepo: UserRepository) {}

  findAll() {
    return this.userRepo.findAll();
  }
}
