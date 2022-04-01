import { Body, Controller, Get, Param, Post, Put } from 'routing-controllers';
import { ILogin, IUserSignUp } from '../../../domains/user/interface';
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

  @Post('/')
  createUser(@Body() request: IUserSignUp) {
    const result = this.userDomain.createUser(request);
    return httpOk(result);
  }

  @Put('/:userId/approveUser')
  updateStatusUser(@Param('userId') userId: number) {
    const result = this.userDomain.updateStatusUser(userId);
    return httpOk(result);
  }

  @Post('/login')
  login(@Body() request: ILogin) {
    const result = this.userDomain.login(request);
    return httpOk(result);
  }
}
