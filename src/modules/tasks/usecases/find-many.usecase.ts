import { BadRequestException } from '@nestjs/common';
import {
  SearchParams,
  SearchProps,
} from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import {
  AppQuery,
  AppQueryProps,
} from 'src/common/utils/app-queries/app-query';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { ITaskRepository } from 'src/domain/tasks/repositories/task-repository';

export namespace FindManyTasksUseCase {
  export type Input = {
    projectId: string;
    searchProps: SearchProps;
    queriesProps?: AppQueryProps[];
  };
  export type Output = SearchResult<TaskResponse.Dto>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: ITaskRepository) {}

    async execute(input: Input): Promise<Output> {
      const { projectId, searchProps, queriesProps } = input;
      if (!projectId) {
        throw new BadRequestException('Busca Inválida');
      }
      const searchParams = new SearchParams(searchProps);
      const appQueries = queriesProps
        ? queriesProps.map((query) => new AppQuery(query))
        : [];
      const result = await this.repository.findMany(searchParams, appQueries);
      return this.convertToResponse(result);
    }

    convertToResponse(
      result: SearchResult<TaskEntity>,
    ): SearchResult<TaskResponse.Dto> {
      const responses = result.items.map((entity) =>
        TaskResponse.Mapper.toResponse(entity),
      );
      return {
        ...result,
        items: responses,
      };
    }
  }
}
