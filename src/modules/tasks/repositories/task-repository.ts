import { IRepository } from 'src/common/repositories/repository.interface';
import { TaskEntity } from 'src/modules/tasks/entities/task-entity';

export interface ITaskRepository extends IRepository.Repository<TaskEntity> {
  findAllByProject(
    projectId: string,
  ): Promise<IRepository.SearchResult<TaskEntity>>;
}
