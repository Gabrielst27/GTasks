import { Injectable, NotFoundException } from '@nestjs/common';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { BaseRepository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { ProjectEntity } from 'src/modules/projects/entities/project.entity';
import { ProjectPrismaModelMapper } from 'src/modules/projects/repositories/prisma/project-prisma-model.mapper';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';

@Injectable()
export class ProjectsPrismaRepository
  extends BaseRepository<ProjectEntity>
  implements IProjectRepository
{
  protected searchableFields: string[] = ['createdAt', 'updatedAt', 'name'];
  protected sortableFields: string[] = ['createdAt', 'updatedAt'];

  constructor(private prismaService: PrismaService) {
    super();
  }

  async findById(id: string): Promise<ProjectEntity> {
    const model = await this.prismaService.project.findFirst({
      where: { id },
    });
    if (!model) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return ProjectPrismaModelMapper.toEntity(model);
  }
  async findMany(
    params: IRepository.SearchParams,
  ): Promise<IRepository.SearchResult<ProjectEntity>> {
    const fields = params.queries.map((query) => query.field);
    super.validate(fields, params.sort);

    const skip = params.page * params.perPage;
    const take = params.perPage;

    let filters = {};
    for (let query of params.queries) {
      filters = this.filter(query.field, query.operator, query.value, filters);
    }

    const total = await this.prismaService.project.count(filters);

    filters = this.paginate(params.sort, params.sortDir, skip, take, filters);

    const itemModels = await this.prismaService.project.findMany(filters);
    const items = itemModels.map((model) =>
      ProjectPrismaModelMapper.toEntity(model),
    );

    return new IRepository.SearchResult<ProjectEntity>({
      items,
      page: 0,
      perPage: 15,
      total,
      sort: params.sort,
      sortDir: params.sortDir,
    });
  }
  async create(item: ProjectEntity): Promise<ProjectEntity> {
    const model = ProjectPrismaModelMapper.toModel(item);
    await this.prismaService.project.create({
      data: model,
    });
    return item;
  }
  update(id: string, item: ProjectEntity): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }

  private paginate(
    orderByField: string,
    orderByDir: string,
    skip: number,
    take: number,
    options?: any,
  ) {
    return {
      ...(options || {}),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip,
      take,
    };
  }

  private filter(
    field: string,
    operator: EDbOperators,
    value: string,
    options?: any,
  ) {
    const existingConditions = options?.where?.[field] || {};
    return {
      ...(options || {}),
      where: {
        ...(options?.where || {}),
        [field]: {
          ...existingConditions,
          [operator]: value,
        },
      },
    };
  }
}
