import { Injectable, NotFoundException } from '@nestjs/common';
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
    //TODO: implement search many projects on repository

    return new IRepository.SearchResult<ProjectEntity>({
      items: [],
      page: 0,
      perPage: 15,
      total: 1,
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
}
