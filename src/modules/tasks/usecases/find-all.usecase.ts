import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';
import { FindManyTasksUseCase } from 'src/modules/tasks/usecases/find-many.usecase';

export namespace FindAllTasksUseCase {
  export type Input = SearchManyRequestDto;

  export type Output = SearchResult<TaskResponse.Dto>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: ITaskRepository) {}

    async execute(input: SearchManyRequestDto): Promise<Output> {
      const usecase = new FindManyTasksUseCase.UseCase(this.repository);
      return await usecase.execute({
        searchProps: input,
        queries: [],
      });
    }
  }
}
