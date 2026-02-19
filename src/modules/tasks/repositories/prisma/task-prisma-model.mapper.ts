import { Task, TaskPriority, TaskStatus } from 'generated/prisma/browser';
import { TaskEntity } from 'src/modules/tasks/entities/task-entity';
import { TaskPriority as AppTaskPriority } from 'src/modules/tasks/enums/priority';
import { TaskStatus as AppTaskStatus } from 'src/modules/tasks/enums/status';

export class TaskPrismaModelMapper {
  static toEntity(model: Task): TaskEntity {
    return new TaskEntity({
      ...model,
      description: model.description ?? undefined,
      status: TaskPrismaModelMapper.statusToAppEnum(model.status),
      priority: TaskPrismaModelMapper.priorityToAppEnum(model.priority),
      dueDate: model.dueDate ?? undefined,
    });
  }

  static toModel(entity: TaskEntity): Task {
    const json = entity.toJson();
    return {
      ...json,
      status: TaskPrismaModelMapper.statusToModelEnum(json.status),
      priority: TaskPrismaModelMapper.priorityToModelEnum(json.priority),
    };
  }

  static statusToAppEnum(statusEnum: TaskStatus): AppTaskStatus {
    const mapper = {
      TO_DO: AppTaskStatus.TO_DO,
      IN_PROGRESS: AppTaskStatus.IN_PROGRESS,
      DONE: AppTaskStatus.DONE,
    };
    return mapper[statusEnum];
  }

  static priorityToAppEnum(priorityEnum: TaskPriority): AppTaskPriority {
    const mapper = {
      LOW: AppTaskPriority.LOW,
      MEDIUM: AppTaskPriority.MEDIUM,
      HIGH: AppTaskPriority.HIGH,
    };
    return mapper[priorityEnum];
  }

  static statusToModelEnum(statusEnum: AppTaskStatus): TaskStatus {
    const mapper = {
      to_do: TaskStatus.TO_DO,
      in_progress: TaskStatus.IN_PROGRESS,
      done: TaskStatus.DONE,
    };
    return mapper[statusEnum];
  }

  static priorityToModelEnum(priorityEnum: AppTaskPriority): TaskPriority {
    const mapper = {
      low: TaskPriority.LOW,
      medium: TaskPriority.MEDIUM,
      high: TaskPriority.HIGH,
    };
    return mapper[priorityEnum];
  }
}
