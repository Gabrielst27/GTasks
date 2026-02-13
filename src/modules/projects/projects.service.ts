import { Injectable } from '@nestjs/common';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/projects.dto';

@Injectable()
export class ProjectsService {
  findAll() {}
  findById(id: string) {}
  create(data: ProjectRequestDto) {}
  update(id: string, data: ProjectRequestDto) {}
  delete(id: string) {}
}
