import { IRepository } from 'src/common/repositories/repository.interface';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';

export interface ITaskRepository extends IRepository<TaskEntity> {}
