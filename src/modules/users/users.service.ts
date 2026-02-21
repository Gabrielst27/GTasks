import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserRequestDto } from 'src/modules/users/dtos/requests/user-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { CreateUserUseCase } from 'src/modules/users/usecases/create.usecase';
import { FindUserByIdUseCase } from 'src/modules/users/usecases/find-by-id.usecase';

@Injectable()
export class UsersService {
  constructor(private repository: IUserRepository) {}

  async findById(id: string): Promise<UserResponse.Dto> {
    const usecase = new FindUserByIdUseCase.UseCase(this.repository);
    return await usecase.execute({ id });
  }

  async create(data: UserRequestDto): Promise<UserResponse.Dto> {
    const usecase = new CreateUserUseCase.UseCase(this.repository);
    return await usecase.execute(data);
  }
}
