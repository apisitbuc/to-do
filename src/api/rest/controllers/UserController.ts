import { Controller, Get } from 'routing-controllers';
import { UserDomain } from '../../../domains/user/user.domain';
import { httpOk } from '../../../utils/responseHelper';

@Controller('/v1/users')
export class UserController {
  constructor(private userDomain: UserDomain) {}

  @Get('/')
  allUsers() {
    const result = this.userDomain.findAll();
    return httpOk(result);
  }
}
