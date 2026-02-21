import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserRequestDto } from 'src/modules/users/dtos/requests/user-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace CreateUserUseCase {
  export type Input = UserRequestDto;

  export type Output = UserResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IUserRepository) {}

    async execute(input: UserRequestDto): Promise<UserResponse.Dto> {
      const { name, email, password } = input;
      if (!name || !email || !password) {
        throw new BadRequestException('Dados inválidos');
      }
      //TODO: implement password cryptography
      const user = new UserEntity(input);
      const result = await this.repository.create(user);
      return UserResponse.Mapper.toResponse(result);
    }
  }
}
