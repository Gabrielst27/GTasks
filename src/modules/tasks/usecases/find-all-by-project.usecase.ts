import { BadRequestException } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';
import { FindManyTasksByProjectUseCase } from 'src/modules/tasks/usecases/find-many-by-project.usecase';

export namespace FindAllTasksByProjectUseCase {
  export type Input = {
    projectId: string;
    params: SearchManyRequestDto;
  };

  export type Output = SearchResult<TaskResponse.Dto>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: ITaskRepository) {}

    async execute(input: Input): Promise<Output> {
      const { projectId, params } = input;
      if (!projectId) {
        throw new BadRequestException('Busca inválida');
      }
      const findMany = new FindManyTasksByProjectUseCase.UseCase(
        this.repository,
      );
      return await findMany.execute({
        projectId,
        searchProps: params,
        queriesProps: [],
      });
    }
  }
}
