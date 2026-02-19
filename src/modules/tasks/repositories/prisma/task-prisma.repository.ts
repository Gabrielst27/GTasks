import { NotFoundException } from '@nestjs/common';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { BaseRepository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { TaskEntity } from 'src/modules/tasks/entities/task-entity';
import { TaskPrismaModelMapper } from 'src/modules/tasks/repositories/prisma/task-prisma-model.mapper';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';

export class TaskPrismaRepository
  extends BaseRepository
  implements ITaskRepository
{
  protected searchableFields: string[];
  protected sortableFields: string[];

  constructor(private prismaService: PrismaService) {
    super();
  }

  async findById(id: string): Promise<TaskEntity> {
    const model = await this.prismaService.task.findUnique({
      where: { id },
    });
    if (!model) throw new NotFoundException('Task não encontrada');
    return TaskPrismaModelMapper.toEntity(model);
  }

  findMany(
    params: IRepository.SearchParams,
    queries: AppQuery[],
  ): Promise<IRepository.SearchResult<TaskEntity>> {
    throw new Error('Method not implemented.');
  }

  async findManyByProject(
    projectId: string,
    searchParams: IRepository.SearchParams,
    queries: AppQuery[],
  ): Promise<IRepository.SearchResult<TaskEntity>> {
    const searchFields = queries.map((query) => query.field);
    super.validateQuery(searchFields, searchParams.sort);

    const skip = searchParams.perPage * searchParams.page;
    const take = searchParams.perPage;

    const filters = await this.prismaService.$extends({
      query: {
        task: {
          count({ model, operation, args, query }) {
            args.where = {
              AND: {
                projectId,
                ...queries.map((q) => ({
                  [q.field]:
                    q.operator === EDbOperators.EQUALS
                      ? q.value
                      : [TaskPrismaModelMapper.operatorToModelEnum(q.operator)],
                })),
              },
            };
            return query(args);
          },
          findMany({ model, operation, args, query }) {
            args.where = {
              AND: {
                projectId,
                ...queries.map((q) => ({
                  [q.field]:
                    q.operator === EDbOperators.EQUALS
                      ? q.value
                      : [TaskPrismaModelMapper.operatorToModelEnum(q.operator)],
                })),
              },
            };
            args.skip = skip;
            args.take = take;
            return query(args);
          },
        },
      },
    });

    const total = await filters.task.count();
    const models = await filters.task.findMany();
    const items = models.map((model) => TaskPrismaModelMapper.toEntity(model));

    return new IRepository.SearchResult({
      items,
      total,
      page: searchParams.page,
      perPage: searchParams.perPage,
      sort: searchParams.sort,
      sortDir: searchParams.sortDir,
    });
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
