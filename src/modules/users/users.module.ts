import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/modules/shared/shared.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserPrismaRepository } from 'src/modules/users/repositories/user-prisma.repository';

@Module({
  imports: [SharedModule],
  providers: [
    PrismaService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: UsersService,
      useFactory: (repository: IUserRepository) => {
        return new UsersService(repository);
      },
      inject: ['Repository'],
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
