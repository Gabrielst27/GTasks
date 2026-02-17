import { IRepository } from 'src/common/repositories/repository.interface';
import { ProjectEntity } from 'src/modules/projects/entities/project.entity';

export interface IProjectRepository extends IRepository.Repository<ProjectEntity> {}
