import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from 'src/modules/tasks/enums/priority';
import { TaskStatus } from 'src/modules/tasks/enums/status';

export namespace TaskResponse {
  type Props = {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    projectId: string;
    createdAt: string;
    updatedAt: string;
  };

  export class Dto {
    @ApiProperty({ description: 'Título da tarefa' })
    title: string;

    @ApiProperty({ description: 'Descrição da tarefa' })
    description: string;

    @ApiProperty({ description: 'Status da tarefa' })
    status: TaskStatus;

    @ApiProperty({ description: 'Prioridade da tarefa' })
    priority: TaskPriority;

    @ApiProperty({ description: 'Data de vencimento da tarefa' })
    dueDate: Date;

    @ApiProperty({ description: 'Projeto ao qual a tarefa pertence' })
    projectId: string;

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
}
