import { Injectable } from '@nestjs/common';
import {
  UserEntity,
  UserEntityProps,
} from 'src/domain/users/entities/user-entity';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private repository: IUserRepository) {}

  async create() {
    const p: UserEntityProps = { name: 'a', email: 'a', password: 's' };
    const e1 = new UserEntity(p);
    return await this.repository.create(e1);
  }
}
