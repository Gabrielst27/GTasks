import { Injectable } from '@nestjs/common';
import {
  UserEntity,
  UserEntityProps,
} from 'src/domain/users/entities/user-entity';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserRequestDto } from 'src/modules/users/dtos/requests/user-request.dto';
import { CreateUserUseCase } from 'src/modules/users/usecases/create.usecase';

@Injectable()
export class UsersService {
  constructor(private repository: IUserRepository) {}

  async create(data: UserRequestDto) {
    const usecase = new CreateUserUseCase.UseCase(this.repository);
    return await usecase.execute(data);
  }
}
