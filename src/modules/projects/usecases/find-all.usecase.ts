import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';
import { FindManyProjectsUseCase } from 'src/modules/projects/usecases/find-many.usecase';

export namespace FindAllProjectsUseCase {
  export type Input = SearchProps;

  export type Output = SearchResult<ProjectResponse.Dto>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IProjectRepository) {}

    async execute(input: Input): Promise<Output> {
      const findMany = FindManyProjectsUseCase.Factory.create(this.repository);

      return await findMany.execute({
        page: input.page || 0,
        perPage: input.perPage || 15,
        sort: input.sort || 'createdAt',
        sortDir: input.sortDir || 'desc',
        queries: [],
      });
    }
  }
}
