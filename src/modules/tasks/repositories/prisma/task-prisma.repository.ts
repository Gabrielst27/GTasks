import { BaseRepository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { TaskEntity } from 'src/modules/tasks/entities/task-entity';
import { TaskPrismaModelMapper } from 'src/modules/tasks/repositories/prisma/task-prisma-model.mapper';

export class TaskPrismaRepository
  extends BaseRepository
  implements IRepository.Repository<TaskEntity>
{
  protected searchableFields: string[];
  protected sortableFields: string[];

  constructor(private prismaService: PrismaService) {
    super();
  }

  findById(id: string): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  findMany(
    params: IRepository.SearchParams,
    queries: AppQuery[],
  ): Promise<IRepository.SearchResult<TaskEntity>> {
    throw new Error('Method not implemented.');
  }
  async create(item: TaskEntity): Promise<TaskEntity> {
    const model = TaskPrismaModelMapper.toModel(item);
    await this.prismaService.task.create({
      data: model,
    });
    return item;
  }
  update(id: string, item: TaskEntity): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
}
