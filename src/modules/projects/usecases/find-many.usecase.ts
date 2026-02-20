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
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';
import { IProjectRepository } from 'src/domain/projects/repositories/projects.repository';

export namespace FindManyProjectsUseCase {
  export type Input = Required<SearchProps & { queries: AppQueryProps[] }>;

  export type Output = SearchResult<ProjectResponse.Dto>;

  class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IProjectRepository) {}
    async execute(input: Input): Promise<Output> {
      const { queries, ...searchProps } = input;
      const queryEntities = queries.map((query) => new AppQuery(query));
      const params = new SearchParams(searchProps);
      const entityResult = await this.repository.findMany(
        params,
        queryEntities,
      );
      const responses = this.convertEntitiesToResponses(entityResult.items);
      return {
        ...entityResult,
        items: responses,
      };
    }

    private convertEntitiesToResponses(
      entities: ProjectEntity[],
    ): ProjectResponse.Dto[] {
      return entities.map((entity) =>
        ProjectResponse.Mapper.toResponse(entity),
      );
    }
  }

  export class Factory {
    static create(repository: IProjectRepository): UseCase {
      return new UseCase(repository);
    }
  }
}
