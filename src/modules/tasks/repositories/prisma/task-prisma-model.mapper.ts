import { Task, TaskPriority, TaskStatus } from 'generated/prisma/browser';
import { TaskEntity } from 'src/modules/tasks/entities/task-entity';
import { TaskPriority as AppTaskPriority } from 'src/modules/tasks/enums/priority';
import { TaskStatus as AppTaskStatus } from 'src/modules/tasks/enums/status';

export class TaskPrismaModelMapper {
  static toModel(entity: TaskEntity): Task {
    const json = entity.toJson();
    return {
      ...json,
      status: TaskPrismaModelMapper.statusToEnum(json.status),
      priority: TaskPrismaModelMapper.priorityToEnum(json.priority),
    };
  }

  static statusToEnum(statusEnum: AppTaskStatus): TaskStatus {
    const mapper = {
      to_do: TaskStatus.TO_DO,
      in_progress: TaskStatus.IN_PROGRESS,
      done: TaskStatus.DONE,
    };
    return mapper[statusEnum];
  }

  static priorityToEnum(priorityEnum: AppTaskPriority): TaskPriority {
    const mapper = {
      low: TaskPriority.LOW,
      medium: TaskPriority.MEDIUM,
      high: TaskPriority.HIGH,
    };
    return mapper[priorityEnum];
  }
}
