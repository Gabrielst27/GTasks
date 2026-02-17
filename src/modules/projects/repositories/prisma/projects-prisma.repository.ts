import { Injectable, NotFoundException } from '@nestjs/common';
import { IRepository } from 'src/common/repositories/repository.interface';
import { ProjectEntity } from 'src/modules/projects/entities/project.entity';
import { ProjectPrismaModelMapper } from 'src/modules/projects/repositories/prisma/project-prisma-model.mapper';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';

@Injectable()
export class ProjectsPrismaRepository implements IProjectRepository {
  searchableFields: string[];

  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<ProjectEntity> {
    const model = await this.prismaService.project.findFirst({
      where: { id },
    });
    if (!model) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return ProjectPrismaModelMapper.toEntity(model);
  }
  findAll(
    params: IRepository.SearchParams,
  ): Promise<IRepository.SearchResult<ProjectEntity>> {
    throw new Error('Method not implemented.');
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
