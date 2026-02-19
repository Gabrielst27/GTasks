import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { TaskPrismaRepository } from 'src/modules/tasks/repositories/prisma/task-prisma.repository';

@Module({
  controllers: [TasksController],
  providers: [
    PrismaService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new TaskPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: TasksService,
      useFactory: (repository: ITaskRepository) => {
        return new TasksService(repository);
      },
      inject: ['Repository'],
    },
  ],
})
export class TasksModule {}
