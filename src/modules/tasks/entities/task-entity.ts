import { Entity, EntityProps } from 'src/common/entities/entity';
import { TaskPriority } from 'src/modules/tasks/enums/priority';
import { TaskStatus } from 'src/modules/tasks/enums/status';

export type TaskEntityProps = {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  projectId: string;
} & EntityProps;

export class TaskEntity extends Entity<TaskEntityProps> {
  constructor(props: TaskEntityProps, id?: string) {
    props.description = props.description ?? '';
    props.status = TaskStatus.TO_DO;
    props.priority = TaskPriority.LOW;
    super(props, id);
  }
}
