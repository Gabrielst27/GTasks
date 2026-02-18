import { IRepository } from 'src/common/repositories/repository.interface';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectResponseDto } from 'src/modules/projects/dtos/responses/project-response.dto';
import { ProjectEntity } from 'src/modules/projects/entities/project.entity';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';

export namespace FindAllProjectsUseCase {
  export type Input = IRepository.SearchProps;

  export type Output = IRepository.SearchResult<ProjectResponseDto.Response>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IProjectRepository) {}
    async execute(input: IRepository.SearchProps): Promise<Output> {
      const params = new IRepository.SearchParams(input);
      const entityResult = await this.repository.findMany(params);
      const responses = this.convertEntitiesToResponses(entityResult.items);
      return {
        ...entityResult,
        items: responses,
      };
    }

    private convertEntitiesToResponses(
      entities: ProjectEntity[],
    ): ProjectResponseDto.Response[] {
      return entities.map((entity) =>
        ProjectResponseDto.Mapper.toResponse(entity),
      );
    }
  }
}
