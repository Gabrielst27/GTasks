import { BadRequestException } from '@nestjs/common';
import { IRepository } from 'src/common/repositories/repository.interface';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import {
  AppQuery,
  AppQueryProps,
} from 'src/common/utils/app-queries/app-query';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TaskEntity } from 'src/modules/tasks/entities/task-entity';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';

export namespace SearchManyTasksByProjectUseCase {
  export type Input = {
    projectId: string;
    searchProps: IRepository.SearchProps;
    queriesProps?: AppQueryProps[];
  };
  export type Output = IRepository.SearchResult<TaskResponse.Dto>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: ITaskRepository) {}

    async execute(input: Input): Promise<Output> {
      const { projectId, searchProps: params, queriesProps: queries } = input;
      if (!projectId) {
        throw new BadRequestException('Busca Inválida');
      }
      const searchParams = new IRepository.SearchParams(params);
      const appQueries = queries
        ? queries.map((query) => new AppQuery(query))
        : [];
      const result = await this.repository.findManyByProject(
        input.projectId,
        searchParams,
        appQueries,
      );
      return this.convertToResponse(result);
    }

    convertToResponse(
      result: IRepository.SearchResult<TaskEntity>,
    ): IRepository.SearchResult<TaskResponse.Dto> {
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
