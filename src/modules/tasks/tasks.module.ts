import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: TasksService,
      useFactory: (repository: ITaskRepository) => {
        return new TasksService(repository);
      },
      inject: [],
    },
  ],
})
export class TasksModule {}
