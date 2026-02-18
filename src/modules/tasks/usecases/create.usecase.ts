import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';

export namespace CreateTaskUseCase {
  export type Input = TaskRequestDto;

  export type Output = TaskResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    execute(
      input: TaskRequestDto,
    ): TaskResponse.Dto | Promise<TaskResponse.Dto> {
      throw new Error('Method not implemented.');
    }
  }
}
