import { IRepository } from 'src/common/repositories/repository.interface';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { TaskEntity } from 'src/modules/tasks/entities/task-entity';

export interface ITaskRepository extends IRepository<TaskEntity> {
  findManyByProject(
    projectId: string,
    searchParams: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<TaskEntity>>;
}
