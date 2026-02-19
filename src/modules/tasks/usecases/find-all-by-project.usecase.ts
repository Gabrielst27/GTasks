import { BadRequestException } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';
import { FindManyTasksUseCase } from 'src/modules/tasks/usecases/find-many.usecase';

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
      const projectFilter: AppQueryProps = {
        field: 'projectId',
        operator: EDbOperators.EQUALS,
        value: projectId,
      };
      const findMany = new FindManyTasksUseCase.UseCase(this.repository);
      return await findMany.execute({
        projectId,
        searchProps: params,
        queriesProps: [projectFilter],
      });
    }
  }
}
