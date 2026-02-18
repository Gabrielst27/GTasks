import { Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { IRepository } from 'src/common/repositories/repository.interface';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponseDto } from 'src/modules/projects/dtos/responses/project-response.dto';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';
import { CreateProjectUseCase } from 'src/modules/projects/usecases/create.usecase';
import { FindAllProjectsUseCase } from 'src/modules/projects/usecases/find-all.usecase';

@Injectable()
export class ProjectsService {
  constructor(private repository: IProjectRepository) {}
  async findMany(
    searchParams: SearchManyRequestDto.Request,
    queries: SearchManyRequestDto.QueriesRequest,
  ): Promise<IRepository.SearchResult<ProjectResponseDto.Response>> {
    const usecase = new FindAllProjectsUseCase.UseCase(this.repository);
    return await usecase.execute({ ...searchParams, ...queries });
  }
  findById(id: string) {}
  async create(data: ProjectRequestDto) {
    const usecase = new CreateProjectUseCase.UseCase(this.repository);
    return await usecase.execute(data);
  }
  update(id: string, data: ProjectRequestDto) {}
  delete(id: string) {}
}
