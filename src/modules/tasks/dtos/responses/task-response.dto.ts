import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { TaskPriority } from 'src/domain/tasks/enums/priority';
import { TaskStatus } from 'src/domain/tasks/enums/status';

export namespace TaskResponse {
  type Props = {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
  };

  export class Dto implements Props {
    @ApiProperty({ description: 'Título da tarefa' })
    title: string;

    @ApiProperty({ description: 'Descrição da tarefa' })
    description: string;

    @ApiProperty({
      description: 'Status da tarefa',
      enum: TaskStatus,
      default: TaskStatus.TO_DO,
    })
    status: TaskStatus;

    @ApiProperty({
      description: 'Prioridade da tarefa',
      enum: TaskPriority,
      default: TaskPriority.LOW,
    })
    priority: TaskPriority;

    @ApiProperty({
      description: 'Data de vencimento da tarefa',
      format: 'date-time',
    })
    dueDate: string;

    @ApiProperty({ description: 'Projeto ao qual a tarefa pertence' })
    projectId: string;

    @ApiProperty({ description: 'ID do colaborador responsável pela tarefa' })
    assigneeId: string;

    @ApiProperty({ description: 'ID do criador da tarefa' })
    createdById: string;

    @ApiProperty({
      description: 'Data de criação da tarefa',
      format: 'date-time',
    })
    createdAt: string;

    @ApiProperty({
      description: 'Data da última atualização da tarefa',
      format: 'date-time',
    })
    updatedAt: string;
  }

  export class Mapper {
    static toResponse(entity: TaskEntity): Dto {
      const json = entity.toJson();
      return {
        ...json,
        createdAt: json.createdAt.toISOString(),
        updatedAt: json.updatedAt.toISOString(),
        dueDate: json.dueDate ? json.dueDate.toISOString() : '',
      };
    }
  }
}
