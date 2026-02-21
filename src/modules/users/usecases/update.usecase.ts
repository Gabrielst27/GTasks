import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserRequestDto } from 'src/modules/users/dtos/requests/user-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace UpdateUserUseCase {
  export type Input = UserRequestDto & { id: string };
  export type Output = UserResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IUserRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id, name } = input;
      if (!id) throw new BadRequestException('Busca inválida');
      if (!name) {
        throw new BadRequestException('Dados inválidos');
      }
      const user = await this.repository.findById(id);
      user.updateProps(input);
      const result = await this.repository.update(id, user);
      return UserResponse.Mapper.toResponse(result);
    }
  }
}
