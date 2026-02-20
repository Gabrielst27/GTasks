import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { CreateTaskRequestDto } from 'src/modules/tasks/dtos/requests/create-task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { ITaskRepository } from 'src/domain/tasks/repositories/task-repository';

export namespace CreateTaskUseCase {
  export type Input = CreateTaskRequestDto;

  export type Output = TaskResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: ITaskRepository) {}
    async execute(input: Input): Promise<Output> {
      const { title, projectId } = input;
      if (!title || !projectId) {
        throw new BadRequestException('Dados inválidos');
      }
      const task = new TaskEntity(input);
      const result = await this.repository.create(task);
      return TaskResponse.Mapper.toResponse(result);
    }
  }
}
