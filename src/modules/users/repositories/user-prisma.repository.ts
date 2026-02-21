import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { UserPrismaModelMapper } from 'src/modules/users/repositories/user-prisma-model.mapper';

export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  findById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
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

  update(id: string, item: UserEntity): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
