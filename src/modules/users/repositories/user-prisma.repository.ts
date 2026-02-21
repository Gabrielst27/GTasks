import { NotFoundException } from '@nestjs/common';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { UserPrismaModelMapper } from 'src/modules/users/repositories/user-prisma-model.mapper';

export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<UserEntity> {
    const model = await this.prismaService.user.findUnique({ where: { id } });
    if (!model) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return UserPrismaModelMapper.toEntity(model);
  }

  findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<UserEntity>> {
    throw new Error('Method not implemented.');
  }

  async create(item: UserEntity): Promise<UserEntity> {
    const model = UserPrismaModelMapper.toModel(item);
    await this.prismaService.user.create({ data: model });
    return item;
  }

  async update(id: string, item: UserEntity): Promise<UserEntity> {
    const model = UserPrismaModelMapper.toModel(item);
    await this.prismaService.user.update({ where: { id }, data: model });
    return item;
  }

  delete(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
