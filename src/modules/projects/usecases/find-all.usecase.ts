import { IRepository } from 'src/common/repositories/repository.interface';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectResponseDto } from 'src/modules/projects/dtos/responses/project-response.dto';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';
import { FindManyProjectsUseCase } from 'src/modules/projects/usecases/find-many.usecase';

export namespace FindAllProjectsUseCase {
  export type Input = IRepository.SearchProps;

  export type Output = IRepository.SearchResult<ProjectResponseDto.Response>;

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
