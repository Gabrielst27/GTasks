import { IRepository } from 'src/common/repositories/repository.interface';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { TaskEntity } from 'src/modules/tasks/entities/task-entity';

export interface ITaskRepository extends IRepository.Repository<TaskEntity> {
  findManyByProject(
    projectId: string,
    searchParams: IRepository.SearchParams,
    queries: AppQuery[],
  ): Promise<IRepository.SearchResult<TaskEntity>>;
}
