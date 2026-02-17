import { Injectable } from '@nestjs/common';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';
import { CreateProjectUseCase } from 'src/modules/projects/usecases/create.usecase';

@Injectable()
export class ProjectsService {
  constructor(private repository: IProjectRepository) {}
  findAll() {}
  findById(id: string) {}
  async create(data: ProjectRequestDto) {
    const usecase = new CreateProjectUseCase(this.repository);
    return await usecase.execute(data);
  }
  update(id: string, data: ProjectRequestDto) {}
  delete(id: string) {}
}
