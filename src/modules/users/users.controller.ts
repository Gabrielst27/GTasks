import { Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create() {
    return this.service.create();
  }
}
