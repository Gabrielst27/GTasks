import { Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { IRepository } from 'src/common/repositories/repository.interface';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponseDto } from 'src/modules/projects/dtos/responses/project-response.dto';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';
import { CreateProjectUseCase } from 'src/modules/projects/usecases/create.usecase';
import { FindAllProjectsUseCase } from 'src/modules/projects/usecases/find-all.usecase';
import { FindProjectByIdUseCase } from 'src/modules/projects/usecases/find-by-id.usecase';
import { UpdateProjectUseCase } from 'src/modules/projects/usecases/update.usecase';

@Injectable()
export class ProjectsService {
  constructor(private repository: IProjectRepository) {}
  async findMany(
    searchParams: SearchManyRequestDto.Request,
    querieParams: SearchManyRequestDto.QueriesRequest,
  ): Promise<IRepository.SearchResult<ProjectResponseDto.Response>> {
    const entityQueries =
      querieParams.queries && querieParams.queries.length
        ? querieParams.queries.map((query) => new IRepository.Query(query))
        : [];
    const usecase = new FindAllProjectsUseCase.UseCase(this.repository);
    return await usecase.execute({ ...searchParams, queries: entityQueries });
  }
  async findById(id: string) {
    const usecase = new FindProjectByIdUseCase.UseCase(this.repository);
    return await usecase.execute({ id });
  }

  async create(data: ProjectRequestDto) {
    const usecase = new CreateProjectUseCase.UseCase(this.repository);
    return await usecase.execute(data);
  }

  async update(id: string, data: ProjectRequestDto) {
    const usecase = new UpdateProjectUseCase.UseCase(this.repository);
    return await usecase.execute({ id, ...data });
  }

  delete(id: string) {}
}
